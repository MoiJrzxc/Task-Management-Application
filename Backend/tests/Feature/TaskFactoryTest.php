<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskFactoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_generate_fake_tasks_via_factory()
    {
        // Create 10 fake tasks
        Task::factory()->count(10)->create();

        // Assert 10 rows exist in the tasks table
        $this->assertDatabaseCount('tasks', 10);

        // Assert at least one row has the expected columns
        $task = Task::first();

        $this->assertNotNull($task->title);
        $this->assertIsString($task->description);
        // status should be one of allowed enum values
        $this->assertContains($task->status, ['pending', 'in_progress', 'completed']);
    }
}
