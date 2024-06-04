<?php
public function showAttendanceLogs()
    {
        $today = date('Y-m-d');
        // Retrieve all logs for today and filter them in the view
        $attendanceLogs = Logs::with(['student', 'instructor'])
            ->whereDate('date', $today)
            ->get(); // Use by in attendance log

        return view('ADMINISTRATOR.AttendanceLog.attendance_log', compact('attendanceLogs'));
    }

// Route for the attendance log page
Route::get('/attendancelog', [ScannerController::class, 'showAttendanceLogs'])->name('attendancelog');