# Generate-Changelog.ps1
# Script para generar un CHANGELOG.md basado en el historial de Git
# Considera tags y conventional commits
# Modo de uso: 
# Basico -> .\generate-changelog.ps1
# Con opciones -> .\generate-changelog.ps1 -OutputFile "CHANGELOG.md" -IncludeUnreleased -SkipEmptyReleases -AppendToExisting -PreserveUnreleased

param (
    [string]$OutputFile = "CHANGELOG.md",
    [switch]$IncludeUnreleased = $true,
    [string]$UnreleasedTitle = "## [Unreleased]",
    [switch]$SkipEmptyReleases = $true,
    [switch]$AppendToExisting = $true,
    [switch]$PreserveUnreleased = $true
)

function Get-GitTags {
    Write-Host "Obteniendo tags del repositorio..." -ForegroundColor Yellow
    $tagsOutput = git tag --sort=-v:refname 2>$null
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error al obtener tags (código $LASTEXITCODE)" -ForegroundColor Red
        return @()
    }
    
    if ([string]::IsNullOrEmpty($tagsOutput)) {
        Write-Host "No se encontraron tags en el repositorio" -ForegroundColor Yellow
        return @()
    }
    
    $tagsArray = $tagsOutput -split '\r?\n' | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
    Write-Host "Tags encontrados: $($tagsArray.Count)" -ForegroundColor Green
    Write-Host ($tagsArray -join ', ') -ForegroundColor Green
    
    return $tagsArray
}

function Has-GitTags {
    $tags = Get-GitTags
    return ($tags.Count -gt 0)
}

function Get-LatestCommitHash {
    Write-Host "Obteniendo último commit..." -ForegroundColor Yellow
    $hash = git rev-parse HEAD
    Write-Host "Último commit: $hash" -ForegroundColor Green
    return $hash
}

function Get-RepoRemoteUrl {
    $remoteUrl = git config --get remote.origin.url 2>$null
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrEmpty($remoteUrl)) {
        Write-Host "No se pudo obtener la URL remota del repositorio" -ForegroundColor Yellow
        return "https://github.com/user/repo"
    }
    
    Write-Host "URL remota del repositorio: $remoteUrl" -ForegroundColor Green
    
    # Convertir URL SSH a HTTPS si es necesario
    if ($remoteUrl -match "git@github\.com:(.+)\.git") {
        return "https://github.com/$($matches[1])"
    }
    elseif ($remoteUrl -match "https://github\.com/(.+)\.git") {
        return "https://github.com/$($matches[1])"
    }
    
    return $remoteUrl
}

function Get-CommitsBetween {
    param (
        [string]$FromRef,
        [string]$ToRef
    )
    
    $logCommand = ""
    if ([string]::IsNullOrEmpty($FromRef)) {
        # Si no hay tag anterior, obtenemos todos los commits hasta el tag actual
        $logCommand = "git log --pretty=format:'%H||%s||%b' $ToRef"
    } else {
        $logCommand = "git log --pretty=format:'%H||%s||%b' $FromRef..$ToRef"
    }
    
    Write-Host "Ejecutando comando: $logCommand" -ForegroundColor Yellow
    $output = Invoke-Expression $logCommand
    
    if ([string]::IsNullOrEmpty($output)) {
        Write-Host "No se encontraron commits entre $FromRef y $ToRef" -ForegroundColor Yellow
        return @()
    }
    
    Write-Host "Se encontraron $(($output -split '\r?\n').Count) commits" -ForegroundColor Green
    return $output
}

function Get-ConventionalCommitType {
    param (
        [string]$CommitMessage
    )
    
    $types = @{
        "feat" = "### Features"
        "fix" = "### Bug Fixes"
        "docs" = "### Documentation"
        "style" = "### Styles"
        "refactor" = "### Code Refactoring"
        "perf" = "### Performance Improvements"
        "test" = "### Tests"
        "build" = "### Builds"
        "ci" = "### Continuous Integration"
        "chore" = "### Chores"
        "revert" = "### Reverts"
    }
    
    $pattern = "^([a-z]+)(\([a-z-]+\))?!?:"
    $match = [regex]::Match($CommitMessage, $pattern)
    
    if ($match.Success) {
        $commitType = $match.Groups[1].Value
        if ($types.ContainsKey($commitType)) {
            return $types[$commitType]
        }
    }
    
    # Si no es un commit convencional, intentamos detectar el tipo por palabras clave en el mensaje
    $lowerMessage = $CommitMessage.ToLower()
    
    if ($lowerMessage -match "(add|new|feat|feature|implement)") {
        return "### Features"
    }
    elseif ($lowerMessage -match "(fix|bug|issue|error|solve|resolve)") {
        return "### Bug Fixes"
    }
    elseif ($lowerMessage -match "(doc|docs|documentation|comment)") {
        return "### Documentation"
    }
    elseif ($lowerMessage -match "(style|format|ui|css)") {
        return "### Styles"
    }
    elseif ($lowerMessage -match "(refactor|clean|improve)") {
        return "### Code Refactoring"
    }
    elseif ($lowerMessage -match "(perf|performance|optimize|speed)") {
        return "### Performance Improvements"
    }
    elseif ($lowerMessage -match "(test|spec|check)") {
        return "### Tests"
    }
    elseif ($lowerMessage -match "(build|package|release|version)") {
        return "### Builds"
    }
    
    return "### Other"
}

function Get-FormattedCommit {
    param (
        [string]$CommitHash,
        [string]$CommitMessage,
        [string]$CommitBody
    )
    
    $shortHash = $CommitHash.Substring(0, 7)
    
    # Aplicar patrón de Conventional Commits
    $pattern = "^([a-z]+)(\(([a-z-]+)\))?!?: (.+)$"
    $match = [regex]::Match($CommitMessage, $pattern)
    
    if ($match.Success) {
        $type = $match.Groups[1].Value
        $scope = $match.Groups[3].Value
        $description = $match.Groups[4].Value.Trim()
        
        $breaking = $CommitMessage -match "^[a-z]+(\([a-z-]+\))?!:"
        $breakingText = ""
        
        if ($breaking) {
            $breakingText = " **BREAKING CHANGE**"
        } elseif ($CommitBody -match "BREAKING CHANGE:") {
            $breakingText = " **BREAKING CHANGE**"
        }
        
        $scopeText = ""
        if (-not [string]::IsNullOrEmpty($scope)) {
            $scopeText = "**$scope**: "
        }
        
        return "- $scopeText$description$breakingText"
    }
    
    # Si no es un commit convencional, usamos el mensaje tal cual
    $cleanMessage = $CommitMessage.Trim()
    # Verificamos si hay un breaking change en el body
    $breakingText = ""
    if ($CommitBody -match "BREAKING CHANGE:") {
        $breakingText = " **BREAKING CHANGE**"
    }
    
    return "- $cleanMessage$breakingText"
}

function Process-Commits {
    param (
        [string[]]$Commits,
        [string]$Version
    )
    
    if ($null -eq $Commits -or $Commits.Count -eq 0) {
        Write-Host "No hay commits para procesar en la versión $Version" -ForegroundColor Yellow
        if ($SkipEmptyReleases) {
            return ""
        }
        return "No changes in this release."
    }
    
    Write-Host "Procesando $($Commits.Count) commits para la versión $Version" -ForegroundColor Green
    
    $commitsByType = @{}
    $processedCount = 0
    
    foreach ($commit in $Commits) {
        if (-not [string]::IsNullOrEmpty($commit)) {
            $parts = $commit -split '\|\|'
            
            if ($parts.Count -ge 2) {
                $hash = $parts[0]
                $message = $parts[1]
                $body = if ($parts.Count -gt 2) { $parts[2] } else { "" }
                
                Write-Verbose "Procesando commit: $hash - $message"
                
                $type = Get-ConventionalCommitType -CommitMessage $message
                $formattedCommit = Get-FormattedCommit -CommitHash $hash -CommitMessage $message -CommitBody $body
                
                if (-not $commitsByType.ContainsKey($type)) {
                    $commitsByType[$type] = @()
                }
                
                $commitsByType[$type] += $formattedCommit
                $processedCount++
            }
        }
    }
    
    Write-Host "Commits procesados correctamente: $processedCount" -ForegroundColor Green
    
    $result = ""
    
    foreach ($type in $commitsByType.Keys | Sort-Object) {
        $result += "$type`n`n"
        foreach ($commit in $commitsByType[$type]) {
            $result += "$commit`n"
        }
        $result += "`n"
    }
    
    return $result
}

function Get-ExistingChangelog {
    param (
        [string]$Path
    )
    
    if (-not (Test-Path -Path $Path)) {
        return $null
    }
    
    $content = Get-Content -Path $Path -Raw
    return $content
}

function Extract-UnreleasedContent {
    param (
        [string]$Content
    )
    
    if ([string]::IsNullOrEmpty($Content)) {
        return $null
    }
    
    $pattern = "(?s)## \[Unreleased\]\s*\r?\n(.*?)(?:\r?\n## \[|$)"
    $match = [regex]::Match($Content, $pattern)
    
    if ($match.Success -and $match.Groups.Count -gt 1) {
        return $match.Groups[1].Value.Trim()
    }
    
    return $null
}

function Generate-Changelog {
    $repoUrl = Get-RepoRemoteUrl
    $hasTags = Has-GitTags
    
    # Preservar CHANGELOG existente si se solicita
    $existingChangelog = $null
    $existingUnreleased = $null
    
    if ($AppendToExisting -and (Test-Path -Path $OutputFile)) {
        $existingChangelog = Get-ExistingChangelog -Path $OutputFile
        if ($PreserveUnreleased) {
            $existingUnreleased = Extract-UnreleasedContent -Content $existingChangelog
        }
    }
    
    $output = ""
    if ([string]::IsNullOrEmpty($existingChangelog)) {
        $output = "# Changelog`n`n"
        $output += "All notable changes to this project will be documented in this file.`n`n"
    }
    
    $tags = @(Get-GitTags)
    $latestCommit = Get-LatestCommitHash
    
    # Sección Unreleased
    if ($IncludeUnreleased) {
        $fromRef = if ($tags.Count -gt 0) { $tags[0] } else { "" }
        $unreleasedCommits = @(Get-CommitsBetween -FromRef $fromRef -ToRef "HEAD")
        
        if (($unreleasedCommits.Count -gt 0 -and -not [string]::IsNullOrEmpty($unreleasedCommits[0])) -or 
            (-not [string]::IsNullOrEmpty($existingUnreleased))) {
            
            $output += "$UnreleasedTitle`n`n"
            
            # Si hay contenido unreleased existente y queremos preservarlo
            if (-not [string]::IsNullOrEmpty($existingUnreleased) -and $PreserveUnreleased) {
                $output += "$existingUnreleased`n`n"
            }
            # Si hay nuevos commits unreleased, los procesamos
            elseif ($unreleasedCommits.Count -gt 0 -and -not [string]::IsNullOrEmpty($unreleasedCommits[0])) {
                $unreleasedContent = Process-Commits -Commits $unreleasedCommits -Version "Unreleased"
                $output += $unreleasedContent
            }
        }
    }
    
    # Sección de versiones con tags
    if ($hasTags) {
        for ($i = 0; $i -lt $tags.Count; $i++) {
            $currentTag = $tags[$i]
            $previousTag = if ($i -lt $tags.Count - 1) { $tags[$i + 1] } else { "" }
            
            # Obtener la fecha del tag
            $tagDate = git log -1 --format=%ai $currentTag 2>$null
            $dateStr = if (-not [string]::IsNullOrEmpty($tagDate)) {
                $date = [DateTime]::Parse($tagDate)
                $date.ToString("yyyy-MM-dd")
            } else {
                ""
            }
            
            $tagTitle = "## [$currentTag]"
            if (-not [string]::IsNullOrEmpty($dateStr)) {
                $tagTitle += " - $dateStr"
            }
            
            $output += "$tagTitle`n`n"
            
            $commits = @(Get-CommitsBetween -FromRef $previousTag -ToRef $currentTag)
            $releaseContent = Process-Commits -Commits $commits -Version $currentTag
            
            if (-not [string]::IsNullOrEmpty($releaseContent)) {
                $output += $releaseContent
            } elseif (-not $SkipEmptyReleases) {
                $output += "No changes in this release.`n`n"
            }
        }
    } else {
        # Si no hay tags, incluimos todos los commits en una sección inicial
        $allCommits = @(Get-CommitsBetween -FromRef "" -ToRef "HEAD")
        if ($allCommits.Count -gt 0 -and -not [string]::IsNullOrEmpty($allCommits[0])) {
            if (-not $IncludeUnreleased) {
                $output += "## [Initial Release]`n`n"
                $initialContent = Process-Commits -Commits $allCommits -Version "Initial"
                $output += $initialContent
            }
        }
    }
    
    return $output
}

# Generar el changelog
$changelog = Generate-Changelog

# Comprobar si se ha generado algo más que solo el encabezado
if ($changelog -match "^# Changelog.*All notable changes to this project will be documented in this file\.\s*$") {
    Write-Host "ADVERTENCIA: El changelog generado solo contiene el encabezado." -ForegroundColor Red
    Write-Host "Comprobando si el repositorio tiene commits..." -ForegroundColor Yellow
    
    # Comprobar si hay commits en el repositorio
    $anyCommits = git log -n 1 --pretty=format:%H 2>$null
    if ([string]::IsNullOrEmpty($anyCommits)) {
        Write-Host "No se encontraron commits en el repositorio." -ForegroundColor Red
    } else {
        Write-Host "El repositorio tiene commits, pero no se pudieron procesar para el changelog." -ForegroundColor Red
        Write-Host "Intentando obtener commits manualmente..." -ForegroundColor Yellow
        $manualCommits = git log --pretty=format:'%H||%s||%b'
        if (-not [string]::IsNullOrEmpty($manualCommits)) {
            Write-Host "Commits encontrados manualmente: $(($manualCommits -split '\r?\n').Count)" -ForegroundColor Green
            $allCommits = @($manualCommits)
            $allContent = Process-Commits -Commits $allCommits -Version "All"
            if (-not [string]::IsNullOrEmpty($allContent)) {
                $changelog += "## [All Commits]`n`n$allContent"
                Write-Host "Se añadieron todos los commits al changelog." -ForegroundColor Green
            }
        }
    }
}

# Decidir si sobrescribir o hacer append
if ($AppendToExisting -and (Test-Path -Path $OutputFile)) {
    # Leer el archivo existente
    $existingContent = Get-Content -Path $OutputFile -Raw
    
    # Si existe una sección "Unreleased" en el existente y hay una nueva, reemplazarla
    if ($existingContent -match "## \[Unreleased\]" -and $changelog -match "## \[Unreleased\]") {
        $newContent = $existingContent -replace "(?s)## \[Unreleased\].*?(?=\r?\n## \[|$)", $changelog
        $newContent | Out-File -FilePath $OutputFile -Encoding utf8
    } else {
        # Si no hay coincidencia, simplemente sobrescribir
        $changelog | Out-File -FilePath $OutputFile -Encoding utf8
    }
} else {
    # Crear nuevo archivo
    $changelog | Out-File -FilePath $OutputFile -Encoding utf8
}

Write-Host "Changelog generado en $OutputFile" -ForegroundColor Green