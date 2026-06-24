<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $products = [
            ['name' => 'Thai Tea (ชาไทย)', 'price' => 45.00, 'category' => 'Milk Tea', 'image_url' => 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=300&auto=format&fit=crop'],
            ['name' => 'Matcha Latte (มัทฉะลาเต้)', 'price' => 65.00, 'category' => 'Matcha', 'image_url' => 'https://images.unsplash.com/photo-1536420121501-8bf884144b2f?q=80&w=300&auto=format&fit=crop'],
            ['name' => 'Brown Sugar Boba (ชานมไข่มุกบราวน์ชูการ์)', 'price' => 55.00, 'category' => 'Boba', 'image_url' => 'https://images.unsplash.com/photo-1595981267035-7b04d84b4f1c?q=80&w=300&auto=format&fit=crop'],
            ['name' => 'Jasmine Green Tea (ชาเขียวมะลิ)', 'price' => 40.00, 'category' => 'Clear Tea', 'image_url' => 'https://images.unsplash.com/photo-1627490214300-880bb66c4c95?q=80&w=300&auto=format&fit=crop'],
            ['name' => 'Peach Tea (ชาพีช)', 'price' => 50.00, 'category' => 'Fruit Tea', 'image_url' => 'https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?q=80&w=300&auto=format&fit=crop'],
            ['name' => 'Taro Milk Tea (ชานมเผือก)', 'price' => 50.00, 'category' => 'Milk Tea', 'image_url' => 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=300&auto=format&fit=crop'], // placeholder reuse
            ['name' => 'Strawberry Matcha (สตรอว์เบอร์รีมัทฉะ)', 'price' => 75.00, 'category' => 'Matcha', 'image_url' => 'https://images.unsplash.com/photo-1536420121501-8bf884144b2f?q=80&w=300&auto=format&fit=crop'],
            ['name' => 'Honey Lemon Tea (ชามะนาวน้ำผึ้ง)', 'price' => 45.00, 'category' => 'Fruit Tea', 'image_url' => 'https://images.unsplash.com/photo-1627490214300-880bb66c4c95?q=80&w=300&auto=format&fit=crop']
        ];

        foreach ($products as $p) {
            Product::firstOrCreate(['name' => $p['name']], $p);
        }
    }
}
