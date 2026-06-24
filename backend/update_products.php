<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$p = \App\Models\Product::where('name', 'Jasmine Green Tea (ชาเขียวมะลิ)')->first(); if($p) { $p->image_url = '/images/jasmine.png'; $p->save(); }
$p = \App\Models\Product::where('name', 'Taro Milk Tea (ชานมเผือก)')->first(); if($p) { $p->image_url = '/images/taro.png'; $p->save(); }
$p = \App\Models\Product::where('name', 'Strawberry Matcha (สตรอว์เบอร์รีมัทฉะ)')->first(); if($p) { $p->image_url = '/images/strawberry_matcha.png'; $p->save(); }
$p = \App\Models\Product::where('name', 'Honey Lemon Tea (ชามะนาวน้ำผึ้ง)')->first(); if($p) { $p->image_url = '/images/honey_lemon.png'; $p->save(); }

\App\Models\Product::firstOrCreate(['name' => 'Strawberry Shortcake (สตรอว์เบอร์รีชอร์ตเค้ก)'], ['price' => 85.00, 'category' => 'Cake', 'image_url' => '/images/strawberry_cake.png']);
\App\Models\Product::firstOrCreate(['name' => 'Chocolate Cake (เค้กช็อกโกแลต)'], ['price' => 75.00, 'category' => 'Cake', 'image_url' => '/images/chocolate_cake.png']);
echo "Updated images and created cakes\n";
