<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:2000'
        ]);

        $message = $request->input('message');
        $apiKey = env('GEMINI_API_KEY');

        if (empty($apiKey)) {
            return response()->json([
                'success' => false,
                'message' => 'ระบบ AI ยังไม่ได้ตั้งค่า API Key กรุณาตรวจสอบไฟล์ .env'
            ], 500);
        }

        try {
            // Context setting for the AI
            $systemPrompt = "คุณคือผู้ช่วย AI ประจำร้าน ChaTime (ร้านขายชานมไข่มุกและเครื่องดื่ม) ชื่อของคุณคือ ChaTime Bot คุณมีหน้าที่ให้คำแนะนำเกี่ยวกับเมนูเครื่องดื่ม ตอบคำถามลูกค้า และช่วยเหลือเกี่ยวกับการใช้งานระบบ POS ขอให้ตอบด้วยความสุภาพ เป็นกันเอง สั้นกระชับเข้าใจง่าย และใช้ภาษาไทยเป็นหลัก\n\nคำถามจากผู้ใช้: ";
            $fullMessage = $systemPrompt . $message;

            $response = Http::timeout(15)->withHeaders([
                'Content-Type' => 'application/json'
            ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $fullMessage]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 800,
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                
                if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                    $reply = $data['candidates'][0]['content']['parts'][0]['text'];
                    return response()->json([
                        'success' => true,
                        'reply' => trim($reply)
                    ]);
                }
            }

            Log::error('Gemini API Error: ' . $response->body());
            
            return response()->json([
                'success' => false,
                'message' => 'ขออภัย ฉันขัดข้องทางเทคนิคเล็กน้อย ไม่สามารถตอบคำถามได้ในขณะนี้'
            ], 500);

        } catch (\Exception $e) {
            Log::error('Gemini Exception: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ AI'
            ], 500);
        }
    }
}
