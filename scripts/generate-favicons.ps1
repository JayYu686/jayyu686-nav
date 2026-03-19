[System.Reflection.Assembly]::LoadWithPartialName('System.Drawing') | Out-Null

$sourceImage = './public/icon-source.png'
$outputPath = './public'

$sizes = @(
    @{ filename = 'favicon-32x32.png'; width = 32; height = 32 },
    @{ filename = 'apple-touch-icon.png'; width = 180; height = 180 },
    @{ filename = 'android-chrome-192x192.png'; width = 192; height = 192 },
    @{ filename = 'android-chrome-512x512.png'; width = 512; height = 512 }
)

if (-not (Test-Path $sourceImage)) {
    Write-Error "Source file not found: $sourceImage"
    exit 1
}

$originalImage = [System.Drawing.Image]::FromFile((Resolve-Path $sourceImage))

try {
    foreach ($size in $sizes) {
        $outputFile = Join-Path $outputPath $size.filename

        $resizedImage = New-Object System.Drawing.Bitmap($size.width, $size.height)
        $resizedImage.SetResolution(96, 96)

        $graphics = [System.Drawing.Graphics]::FromImage($resizedImage)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

        $graphics.DrawImage($originalImage, 0, 0, $size.width, $size.height)

        Write-Host "Generated: $($size.filename)"
        $resizedImage.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)

        $graphics.Dispose()
        $resizedImage.Dispose()
    }

    Write-Host 'Done.'
}
finally {
    $originalImage.Dispose()
}
