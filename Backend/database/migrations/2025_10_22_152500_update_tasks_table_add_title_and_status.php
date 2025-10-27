<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('tasks')) {
            return;
        }

        // Add columns if missing
        Schema::table('tasks', function (Blueprint $table) {
            if (!Schema::hasColumn('tasks', 'title')) {
                $table->string('title')->nullable()->after('id');
            }

            if (!Schema::hasColumn('tasks', 'status')) {
                $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending')->after('description');
            }
        });

        // If an old `name` column exists, copy its values to `title` then drop the `name` column
        if (Schema::hasColumn('tasks', 'name') && Schema::hasColumn('tasks', 'title')) {
            // Copy values from name -> title for rows where title is null/empty
            DB::statement("UPDATE `tasks` SET `title` = `name` WHERE `title` IS NULL OR `title` = ''");

            // Drop the old `name` column
            Schema::table('tasks', function (Blueprint $table) {
                // Some DB drivers require this to be the only change in the closure
                if (Schema::hasColumn('tasks', 'name')) {
                    $table->dropColumn('name');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (!Schema::hasTable('tasks')) {
            return;
        }

        // If title exists but name doesn't, recreate name and copy values back
        if (Schema::hasColumn('tasks', 'title') && !Schema::hasColumn('tasks', 'name')) {
            Schema::table('tasks', function (Blueprint $table) {
                $table->string('name')->nullable()->after('id');
            });

            DB::statement("UPDATE `tasks` SET `name` = `title` WHERE `name` IS NULL OR `name` = ''");
        }

        // Drop title and status if present
        Schema::table('tasks', function (Blueprint $table) {
            if (Schema::hasColumn('tasks', 'status')) {
                $table->dropColumn('status');
            }

            if (Schema::hasColumn('tasks', 'title')) {
                $table->dropColumn('title');
            }
        });
    }
};
