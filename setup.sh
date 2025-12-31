#!/bin/bash

# 🚀 Odyssey HUD - Quick Setup Script for Claude Code Workflow
# This script helps you set up GitHub CLI and prepare for productive coding

set -e

echo "🎮 Odyssey HUD 2026 - Claude Code Setup"
echo "=========================================="
echo ""

# Check for GitHub CLI
echo "📦 Checking for GitHub CLI..."
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI is already installed!"
    gh --version
else
    echo "❌ GitHub CLI not found."
    echo ""
    echo "Installing GitHub CLI..."

    # Detect OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install gh
        else
            echo "⚠️  Homebrew not found. Please install Homebrew first:"
            echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        echo "Installing gh CLI for Linux..."
        curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
        sudo apt update
        sudo apt install gh
    else
        echo "⚠️  Unsupported OS. Please install GitHub CLI manually:"
        echo "   https://cli.github.com/manual/"
        exit 1
    fi
fi

echo ""
echo "🔐 Authenticating with GitHub..."
echo "Please follow these prompts:"
echo "  1. Choose 'GitHub.com'"
echo "  2. Choose 'HTTPS' (or SSH if you've set it up)"
echo "  3. Choose 'Login with a web browser' when prompted"
echo ""

gh auth login

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Authentication successful!"
    echo ""
else
    echo ""
    echo "❌ Authentication failed. Please try again."
    exit 1
fi

echo "⚙️  Setting up Git credentials..."
gh auth setup-git

echo ""
echo "📁 Creating git worktrees directory (for parallel work)..."
mkdir -p ../HUD-worktrees
echo "✅ Worktrees directory created at ../HUD-worktrees/"

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "📚 Next Steps:"
echo "   1. Read: claude_code_guide.md - Full workflow guide"
echo "   2. Check: TASKS.md - Your task list"
echo "   3. Start: Tell Claude to 'Work on the first high-priority task in TASKS.md'"
echo ""
echo "🚀 Quick Commands:"
echo "   gh issue list              # List GitHub issues"
echo "   gh pr list                  # List pull requests"
echo "   git worktree add ../name branch  # Create worktree"
echo "   cat TASKS.md                # View tasks"
echo ""
echo "💡 Pro Tip: Keep TASKS.md open and update it as you work!"
echo ""
