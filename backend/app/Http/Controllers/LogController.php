<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UsageLog;

class LogController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'fileName' => 'required|string',
            'totalPages' => 'required|integer',
            'bwPages' => 'required|integer',
            'colorPages' => 'required|integer',
            'estimatedCost' => 'required|numeric',
        ]);

        UsageLog::create([
            'Username' => $request->username,
            'FileName' => $request->fileName,
            'TotalPages' => $request->totalPages,
            'BWPages' => $request->bwPages,
            'ColorPages' => $request->colorPages,
            'EstimatedCost' => $request->estimatedCost,
        ]);

        return response()->json(['message' => 'บันทึกประวัติการใช้บริการสำเร็จ'], 201);
    }
}
