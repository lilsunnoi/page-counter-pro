<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function dashboard(Request $request)
    {
        $request->validate([
            'requestorUsername' => 'required|string'
        ]);

        $requestorUsername = $request->requestorUsername;

        // Verify if the requestor is an admin
        $user = User::where('Username', $requestorUsername)->first();
        if (!$user || $user->Role !== 'admin') {
            return response()->json(['message' => 'คุณไม่มีสิทธิ์ในการเข้าถึงข้อมูลแผงควบคุมนี้'], 403);
        }

        // Base query for overall stats
        $statsQuery = Order::query();
        if ($request->has('start_date') && $request->has('end_date') && $request->start_date && $request->end_date) {
            $statsQuery->whereBetween('created_at', [$request->start_date . ' 00:00:00', $request->end_date . ' 23:59:59']);
        }

        $totalOrders = (clone $statsQuery)->count();
        $totalRevenue = (clone $statsQuery)->sum('total_amount') ?? 0;
        
        $today = Carbon::today();
        $todayOrders = Order::whereDate('created_at', $today)->count();
        $todayRevenue = Order::whereDate('created_at', $today)->sum('total_amount') ?? 0;

        // Fetch last 7 days sales for chart
        $last7Days = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $dailyTotal = Order::whereDate('created_at', $date)->sum('total_amount') ?? 0;
            $last7Days[] = [
                'date' => $date->format('d/m'),
                'total' => $dailyTotal
            ];
        }

        // Fetch recent orders (filtered or limited to 50)
        $ordersQuery = Order::with('items.product')->orderBy('created_at', 'desc');
        if ($request->has('start_date') && $request->has('end_date') && $request->start_date && $request->end_date) {
            $ordersQuery->whereBetween('created_at', [$request->start_date . ' 00:00:00', $request->end_date . ' 23:59:59']);
        } else {
            $ordersQuery->take(50);
        }

        $recentOrders = $ordersQuery->get()->map(function ($order) {
            return [
                'id' => $order->id,
                'username' => $order->username,
                'total_amount' => $order->total_amount,
                'created_at' => $order->created_at,
                'items_count' => $order->items->sum('quantity')
            ];
        });

        // Fetch users list
        $users = User::orderBy('CreatedAt', 'desc')->get()->map(function ($user) {
            return [
                'username' => $user->Username,
                'role' => $user->Role,
                'createdAt' => $user->CreatedAt,
            ];
        });

        return response()->json([
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'todayOrders' => $todayOrders,
                'todayRevenue' => $todayRevenue
            ],
            'chartData' => $last7Days,
            'recentOrders' => $recentOrders,
            'users' => $users
        ], 200);
    }

    public function deleteUser(Request $request, $username)
    {
        $request->validate([
            'requestorUsername' => 'required|string'
        ]);

        $requestor = User::where('Username', $request->requestorUsername)->first();
        if (!$requestor || $requestor->Role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $targetUser = User::where('Username', $username)->first();
        if (!$targetUser) {
            return response()->json(['message' => 'ไม่พบผู้ใช้'], 404);
        }

        if ($targetUser->Role === 'admin') {
            return response()->json(['message' => 'ไม่สามารถลบบัญชีผู้ดูแลระบบได้'], 403);
        }

        $targetUser->delete();
        return response()->json(['message' => 'ลบผู้ใช้สำเร็จ']);
    }

    public function updatePassword(Request $request, $username)
    {
        $request->validate([
            'requestorUsername' => 'required|string',
            'newPassword' => 'required|string|min:4'
        ]);

        $requestor = User::where('Username', $request->requestorUsername)->first();
        if (!$requestor || $requestor->Role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $targetUser = User::where('Username', $username)->first();
        if (!$targetUser) {
            return response()->json(['message' => 'ไม่พบผู้ใช้'], 404);
        }

        if ($targetUser->Role === 'admin') {
            return response()->json(['message' => 'ไม่สามารถเปลี่ยนรหัสผ่านของผู้ดูแลระบบได้'], 403);
        }

        $targetUser->PasswordHash = Hash::make($request->newPassword);
        $targetUser->save();

        return response()->json(['message' => 'เปลี่ยนรหัสผ่านสำเร็จ']);
    }
}
