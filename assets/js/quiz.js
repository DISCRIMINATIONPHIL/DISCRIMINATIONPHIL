// Quiz Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz page loaded');
    
    // Elements
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizIntroSection = document.querySelector('.quiz-intro-section');
    const quizFormSection = document.getElementById('quizFormSection');
    const quizForm = document.getElementById('discriminationQuizForm');
    const questions = document.querySelectorAll('.quiz-question');
    const progressFill = document.getElementById('progressFill');
    const currentQuestionEl = document.getElementById('currentQuestion');
    
    let currentQuestion = 1;
    const totalQuestions = questions.length;
    
    // Start Quiz Button
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            // Hide intro, show quiz form
            quizIntroSection.style.display = 'none';
            quizFormSection.style.display = 'block';
            
            // Trigger fade-in animation
            setTimeout(() => {
                quizFormSection.style.opacity = '1';
            }, 10);
            
            // Update progress
            updateProgress();
            
            // Set focus for accessibility
            const firstQuestion = document.querySelector('.quiz-question.active');
            const firstRadio = firstQuestion.querySelector('input[type="radio"]');
            if (firstRadio) {
                setTimeout(() => {
                    firstRadio.focus();
                }, 100);
            }
        });
    }
    
    // Navigation between questions
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('next-btn') || this.classList.contains('prev-btn')) {
                e.preventDefault(); // Prevent form submission
                
                // Validate current question before moving
                const currentQuestionDiv = document.querySelector('.quiz-question.active');
                const requiredInputs = currentQuestionDiv.querySelectorAll('input[required]');
                let isValid = true;
                
                // Check if any required inputs are not filled
                requiredInputs.forEach(input => {
                    if (!input.checked && !input.value) {
                        isValid = false;
                        // Highlight the question to indicate it needs attention
                        currentQuestionDiv.classList.add('attention-needed');
                        setTimeout(() => {
                            currentQuestionDiv.classList.remove('attention-needed');
                        }, 1000);
                    }
                });
                
                if (!isValid) {
                    // Show a subtle hint that selection is needed
                    const questionHeader = currentQuestionDiv.querySelector('.question-header');
                    const originalText = questionHeader.querySelector('.question-help').textContent;
                    questionHeader.querySelector('.question-help').textContent = 'Please select an option to continue';
                    setTimeout(() => {
                        questionHeader.querySelector('.question-help').textContent = originalText;
                    }, 1500);
                    return;
                }
                
                if (this.classList.contains('next-btn')) {
                    const nextQuestion = this.getAttribute('data-next');
                    goToQuestion(parseInt(nextQuestion));
                } else if (this.classList.contains('prev-btn')) {
                    const prevQuestion = this.getAttribute('data-prev');
                    goToQuestion(parseInt(prevQuestion));
                }
            }
        });
    });
    
    // Function to navigate to specific question
    function goToQuestion(questionNumber) {
        // Hide all questions
        questions.forEach(question => {
            question.style.display = 'none';
            question.classList.remove('active');
        });
        
        // Show target question
        const targetQuestion = document.querySelector(`.quiz-question[data-question="${questionNumber}"]`);
        if (targetQuestion) {
            targetQuestion.style.display = 'block';
            targetQuestion.classList.add('active');
            currentQuestion = questionNumber;
            
            // Update progress bar
            updateProgress();
            
            // Set focus for accessibility
            setTimeout(() => {
                const firstInput = targetQuestion.querySelector('input[type="radio"]');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        }
    }
    
    // Update progress bar
    function updateProgress() {
        const progressPercentage = (currentQuestion / totalQuestions) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        currentQuestionEl.textContent = currentQuestion;
    }
    
    // Form submission
    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                group: getSelectedValue('group'),
                area: getSelectedValue('area'),
                frequency: getSelectedValue('frequency'),
                awareness: getSelectedValue('awareness')
            };
            
            console.log('Form submitted:', formData);
            
            // Determine result based on logic from original files
            let resultPage = '';
            
            // Logic from original legalQUIZ.html
            if (formData.group === 'none') {
                resultPage = 'learn-more.html';
            } else if (formData.frequency === 'multiple') {
                // Multiple instances = action page
                resultPage = `${formData.group}-action.html`;
            } else {
                // Single instance or not experiencing = learn page
                resultPage = `${formData.group}-learn.html`;
            }
            
            // If group is selected but no frequency (user skipped), default to learn page
            if (formData.group && formData.group !== 'none' && !formData.frequency) {
                resultPage = `${formData.group}-learn.html`;
            }
            
            // If no group selected, go to general learn page
            if (!formData.group || formData.group === '') {
                resultPage = 'learn-more.html';
            }
            
            // Add fade out effect before redirect
            const quizContainer = document.querySelector('.quiz-form-section');
            quizContainer.style.opacity = '0';
            quizContainer.style.transition = 'opacity 0.5s ease';
            
            // Redirect after fade out
            setTimeout(() => {
                console.log('Redirecting to:', resultPage);
                window.location.href = resultPage;
            }, 500);
        });
    }
    
    // Helper function to get selected radio value
    function getSelectedValue(name) {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : null;
    }
    
    // Accessibility: Keyboard navigation for options
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const radio = this.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    // Trigger change event
                    radio.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });
    });
    
    // Auto-advance on selection (optional feature)
    const autoAdvance = false; // Set to true if you want auto-advance
    if (autoAdvance) {
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                // Wait a moment, then check if we should auto-advance
                setTimeout(() => {
                    const currentQuestionDiv = document.querySelector('.quiz-question.active');
                    const questionNumber = parseInt(currentQuestionDiv.getAttribute('data-question'));
                    
                    // Only auto-advance if not on last question
                    if (questionNumber < totalQuestions) {
                        const nextBtn = currentQuestionDiv.querySelector('.next-btn');
                        if (nextBtn) {
                            // Small delay for user to see selection
                            setTimeout(() => {
                                nextBtn.click();
                            }, 500);
                        }
                    }
                }, 100);
            });
        });
    }
    
    // Initialize first question focus
    const firstQuestion = document.querySelector('.quiz-question.active');
    if (firstQuestion) {
        const firstRadio = firstQuestion.querySelector('input[type="radio"]');
        if (firstRadio) {
            firstRadio.focus();
        }
    }
});
