class WorksheetManager {
    constructor() {
        this.initializeControls();
        this.initializeExercises();
    }

    initializeControls() {
        const toggleAnswersBtn = document.querySelector('.toggle-answers');
        if (toggleAnswersBtn) {
            toggleAnswersBtn.addEventListener('click', () => this.toggleAnswers());
        }

        const printBtn = document.querySelector('.print-worksheet');
        if (printBtn) {
            printBtn.addEventListener('click', () => window.print());
        }
    }

    initializeExercises() {
        this.initializeMultipleChoice();
        this.initializeFillBlanks();
        this.initializeMatching();
        this.initializeAudioElements();
    }

    initializeMultipleChoice() {
        document.querySelectorAll('.multiple-choice').forEach(exercise => {
            exercise.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', () => this.checkMultipleChoiceAnswer(exercise));
            });
        });
    }

    initializeFillBlanks() {
        document.querySelectorAll('.fill-blank-exercise').forEach(exercise => {
            exercise.querySelectorAll('input[type="text"]').forEach(input => {
                input.addEventListener('blur', () => this.checkFillBlankAnswer(input));
            });
        });
    }

    initializeMatching() {
        document.querySelectorAll('.matching-exercise').forEach(exercise => {
            this.setupDragAndDrop(exercise);
        });
    }

    initializeAudioElements() {
        document.querySelectorAll('.audio-exercise').forEach(exercise => {
            const audio = exercise.querySelector('audio');
            const playBtn = exercise.querySelector('.play-audio');
            if (audio && playBtn) {
                playBtn.addEventListener('click', () => {
                    if (audio.paused) {
                        audio.play();
                        playBtn.textContent = 'Pause';
                    } else {
                        audio.pause();
                        playBtn.textContent = 'Play';
                    }
                });
            }
        });
    }

    toggleAnswers() {
        document.querySelectorAll('.answer').forEach(answer => {
            answer.classList.toggle('hidden');
        });
    }

    checkMultipleChoiceAnswer(exercise) {
        const selected = exercise.querySelector('input[type="radio"]:checked');
        const correct = exercise.dataset.correct;
        
        if (selected && selected.value === correct) {
            this.showFeedback(exercise, true);
        } else {
            this.showFeedback(exercise, false);
        }
    }

    checkFillBlankAnswer(input) {
        const exercise = input.closest('.fill-blank-exercise');
        const correct = input.dataset.correct.toLowerCase();
        const userAnswer = input.value.toLowerCase().trim();
        
        if (userAnswer === correct) {
            this.showFeedback(exercise, true);
            input.classList.add('correct');
        } else {
            this.showFeedback(exercise, false);
            input.classList.remove('correct');
        }
    }

    showFeedback(exercise, isCorrect) {
        let feedback = exercise.querySelector('.feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'feedback';
            exercise.appendChild(feedback);
        }

        feedback.textContent = isCorrect ? 'Correct!' : 'Try again!';
        feedback.className = `feedback ${isCorrect ? 'success' : 'error'}`;
    }

    setupDragAndDrop(exercise) {
        // Implement drag and drop functionality for matching exercises
        // This is a placeholder for future implementation
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WorksheetManager();
});
