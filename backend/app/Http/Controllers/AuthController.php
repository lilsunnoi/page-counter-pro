<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|min:3',
            'password' => 'required|string|min:6',
        ]);

        $username = $request->username;
        $password = $request->password;

        $existingUser = User::where('Username', $username)->first();
        if ($existingUser) {
            return response()->json(['message' => 'ชื่อผู้ใช้งานนี้ถูกใช้งานแล้ว กรุณาใช้ชื่ออื่น'], 400);
        }

        $role = strtolower($username) === 'admin' ? 'admin' : 'user';

        $user = User::create([
            'Username' => $username,
            'PasswordHash' => Hash::make($password),
            'Role' => $role,
        ]);

        return response()->json(['message' => 'สมัครสมาชิกสำเร็จ'], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('Username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->PasswordHash)) {
            return response()->json(['message' => 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'], 400);
        }

        // Generate token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'เข้าสู่ระบบสำเร็จ',
            'username' => $user->Username,
            'role' => $user->Role ?? 'user',
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'ออกจากระบบสำเร็จ']);
    }
}
