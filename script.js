// Tab Navigation
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Git Simulator Variables
let branches = ['main'];
let commits = ['Initial commit'];
let currentBranch = 'main';
let branchCommits = {
    'main': ['Initial commit']
};

// Create Branch
const createBranchBtn = document.getElementById('createBranchBtn');
const branchName = document.getElementById('branchName');
const branchList = document.getElementById('branchList');

createBranchBtn.addEventListener('click', function() {
    const name = branchName.value.trim();
    
    if (name === '') {
        alert('Please enter a branch name!');
        return;
    }
    
    if (branches.includes(name)) {
        alert('Branch already exists!');
        return;
    }
    
    // Create new branch
    branches.push(name);
    branchCommits[name] = [...branchCommits[currentBranch]];
    
    updateBranchList();
    branchName.value = '';
    updateRepoStatus();
});

// Update Branch List
function updateBranchList() {
    branchList.innerHTML = '';
    branches.forEach(branch => {
        const branchItem = document.createElement('div');
        branchItem.className = 'branch-item';
        if (branch === currentBranch) {
            branchItem.classList.add('active');
        }
        branchItem.textContent = '🌳 ' + branch;
        branchItem.style.cursor = 'pointer';
        
        branchItem.addEventListener('click', function() {
            currentBranch = branch;
            updateBranchList();
            updateCommitHistory();
            updateRepoStatus();
        });
        
        branchList.appendChild(branchItem);
    });
}

// Commit Changes
const commitBtn = document.getElementById('commitBtn');
const commitMessage = document.getElementById('commitMessage');
const commitHistory = document.getElementById('commitHistory');

commitBtn.addEventListener('click', function() {
    const message = commitMessage.value.trim();
    
    if (message === '') {
        alert('Please enter a commit message!');
        return;
    }
    
    // Add commit
    const timestamp = new Date().toLocaleTimeString();
    const commitEntry = `${message} (${timestamp})`;
    
    if (!branchCommits[currentBranch]) {
        branchCommits[currentBranch] = [];
    }
    branchCommits[currentBranch].push(commitEntry);
    
    updateCommitHistory();
    commitMessage.value = '';
    updateRepoStatus();
});

// Update Commit History
function updateCommitHistory() {
    commitHistory.innerHTML = '';
    
    if (branchCommits[currentBranch]) {
        branchCommits[currentBranch].forEach((commit, index) => {
            const commitItem = document.createElement('div');
            commitItem.className = 'commit-item';
            commitItem.textContent = `${index + 1}. ${commit}`;
            commitHistory.appendChild(commitItem);
        });
    }
}

// Update Repository Status
function updateRepoStatus() {
    const branchCount = document.getElementById('branchCount');
    const commitCount = document.getElementById('commitCount');
    const currentBranchSpan = document.getElementById('currentBranch');
    
    branchCount.textContent = branches.length;
    const totalCommits = Object.values(branchCommits).reduce((sum, commits) => sum + commits.length, 0);
    commitCount.textContent = totalCommits;
    currentBranchSpan.textContent = currentBranch;
}

// Initialize UI
updateBranchList();
updateCommitHistory();
updateRepoStatus();

// Allow Enter key in input fields
branchName.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        createBranchBtn.click();
    }
});

commitMessage.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        commitBtn.click();
    }
});

// Console welcome message
console.log('%c🚀 Welcome to Git & GitHub Learning Hub!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cStart exploring the tabs to learn about Git and GitHub concepts.', 'font-size: 14px; color: #764ba2;');
console.log('%cTry the Interactive Git Simulator to create branches and make commits!', 'font-size: 14px; color: #764ba2;');
