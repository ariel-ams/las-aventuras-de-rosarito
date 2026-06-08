param(
  [string]$BaseUrl = "http://127.0.0.1:5322/index.html",
  [string]$OutputDir = "test-artifacts",
  [string]$RunName = "",
  [string]$EdgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $EdgePath)) {
  throw "Microsoft Edge no encontrado en: $EdgePath"
}

if ([string]::IsNullOrWhiteSpace($RunName)) {
  $RunName = Get-Date -Format "yyyyMMdd-HHmmss"
}

if ([System.IO.Path]::IsPathRooted($OutputDir)) {
  $outputRoot = $OutputDir
} else {
  $outputRoot = Join-Path (Get-Location) $OutputDir
}

New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null
$targetDir = Join-Path $outputRoot $RunName
New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
$targetDir = (Resolve-Path -LiteralPath $targetDir).Path

$shots = @(
  @{ name = "cover.png"; size = "1280,720"; query = "qa=$RunName-cover" },
  @{ name = "quiz.png"; size = "1280,720"; query = "scene=quiz&qa=$RunName-quiz" },
  @{ name = "puzzle.png"; size = "1280,720"; query = "scene=puzzle&qa=$RunName-puzzle" },
  @{ name = "objects.png"; size = "1280,720"; query = "scene=objects&qa=$RunName-objects" },
  @{ name = "final.png"; size = "1280,720"; query = "scene=final&qa=$RunName-final" },
  @{ name = "mobile-landscape.png"; size = "932,430"; query = "qa=$RunName-mobile-landscape" },
  @{ name = "mobile-portrait.png"; size = "430,932"; query = "qa=$RunName-mobile-portrait" }
)

foreach ($shot in $shots) {
  $separator = if ($BaseUrl.Contains("?")) { "&" } else { "?" }
  $url = "${BaseUrl}${separator}$($shot.query)"
  $path = Join-Path $targetDir $shot.name
  & $EdgePath --headless=new --disable-gpu --hide-scrollbars --window-size=$($shot.size) --virtual-time-budget=9000 --screenshot=$path $url | Out-Null
  Write-Output $path
}
