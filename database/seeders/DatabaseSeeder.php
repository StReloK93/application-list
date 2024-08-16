<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\App;
use App\Models\User;
use Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        User::create([
            'name' => 'Admin',
            'login' => 'superadmin',
            'password' => Hash::make('zzzz1111*')
        ]);



        Category::create(["name"=> "Transport"]);
        Category::create(["name"=> "Kadrlar"]);
        Category::create(["name"=> "Buxgalteriya"]);

    }
}
