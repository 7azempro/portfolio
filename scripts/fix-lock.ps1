Write-Host "🛑 STARTING DEEP CLEAN..." -ForegroundColor Yellow

# 1. Kill Specific Port 3000 Occupants
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    $pid3000 = $port3000.OwningProcess
    Write-Host "Found process $pid3000 on Port 3000. Killing..." -ForegroundColor Red
    Stop-Process -Id $pid3000 -Force -ErrorAction SilentlyContinue
}

# 2. Kill All Node Processes (Nuclear Option)
Write-Host "Killing all node.exe processes..." -ForegroundColor Red
taskkill /F /IM node.exe /T 2>$null

# 3. Wait for file handles to release
Start-Sleep -Seconds 3

# 4. Delete .next folder
if (Test-Path ".next") {
    Write-Host "Deleting .next folder..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    if (Test-Path ".next") {
        Write-Host "⚠️ Warning: Could not fully delete .next folder. Some files might be locked." -ForegroundColor Red
    } else {
        Write-Host "✅ .next folder deleted." -ForegroundColor Green
    }
}

# 5. Start Server
Write-Host "🚀 Starting Fresh Server..." -ForegroundColor Green
npm run dev
