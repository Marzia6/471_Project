import React, { useState } from 'react';

const CompanionText = () => {
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});

    const questions = [
        {
            question: "A user shares that they are feeling overwhelmed and don't know how to manage their responsibilities. What is the most appropriate response as a companion?",
            options: [
              "That sounds tough. Have you tried ignoring your responsibilities for a while?",
              "It must be overwhelming. Take a moment to breathe; I'm here to listen.",
              "You should just stop worrying; it's not that big of a deal.",
              "Everyone gets overwhelmed sometimes; just get over it."
            ],
            correct: 2
        },
        {
            question: "A user says they are struggling with low self-esteem. How should you respond?",
            options: [
              "Why not just fake confidence until you feel better?",
              "I'm sorry to hear that. Can you tell me more about what's causing this?",
              "Everyone has low self-esteem sometimes; it's normal.",
              "You shouldn't feel that way; you're fine."
            ],
            "correct": 2
        },
        {
            question: "A user expresses frustration about a personal conflict. What is the most helpful response?",
            options: [
              "You should ignore them; they don't matter.",
              "That sounds challenging. Would you like to talk through what happened?",
              "Conflicts happen all the time; it's not worth discussing.",
              "Why not just apologize and move on?"
            ],
            "correct": 2
        },
        {
            question: "A user mentions they are experiencing anxiety about an upcoming event. What would be the best response?",
            options: [
              "Anxiety is normal; just get through it.",
              "It's understandable to feel that way. Do you want to share what's worrying you?",
              "You shouldn't worry; it's probably nothing.",
              "Why not just avoid the event altogether?"
            ],
            "correct": 2
        },
        {
            question: "A user reveals they feel they are not good enough. How should you respond?",
            options: [
              "That's not true. Can you tell me why you feel this way?",
              "Everyone feels like that sometimes; don't worry.",
              "You should stop thinking like that and move on.",
              "You're probably overthinking it."
            ],
            "correct": 1
        },
        {
            question: "A user is hesitant to open up about their feelings. What would be the best approach?",
            options: [
              "Take your time. I'm here when you're ready to talk.",
              "Why don't you trust me yet?",
              "You should open up; it'll make you feel better.",
              "If you don't talk, I can't help you."
            ],
            "correct": 1
        },
        {
            question: "A user shares that they are dealing with a recent loss. What is the best way to respond?",
            options: [
              "Loss happens to everyone; you'll get over it.",
              "I'm so sorry for your loss. I'm here to listen if you want to talk.",
              "Try not to think about it too much.",
              "You'll feel better soon; don't dwell on it."
            ],
            "correct": 2
        },
        {
            question: "A user says they are constantly being criticized by others. What would you say to help?",
            options: [
              "Ignore them; their opinions don't matter.",
              "That must be hard. How does that make you feel?",
              "You should just stop caring about what they think.",
              "Criticism is part of life; deal with it."
            ],
            "correct": 2
        },
        {
            question: "A user tells you they feel stuck and don't know what to do next. How should you respond?",
            options: [
              "You should just make a decision already.",
              "That sounds difficult. What options are you considering?",
              "Being stuck happens to everyone; don't overthink it.",
              "Why not just do nothing for now?"
            ],
            "correct": 2
        },
        {
            question: "A user shares they are feeling burned out. What's the most helpful response?",
            options: [
              "You need to push through it; that's life.",
              "Burnout is tough. What do you think could help you feel more balanced?",
              "It happens to everyone; don't overreact.",
              "You're probably just tired; take a nap."
            ],
            "correct": 2
        },
        {
            question: "A user mentions they feel like no one understands them. How should you respond?",
            options: [
              "That sounds really tough. I'd like to understand more if you're comfortable sharing.",
              "Maybe you're just not explaining yourself clearly.",
              "Everyone feels misunderstood sometimes; it's normal.",
              "Why not try talking to someone else instead?"
            ],
            "correct": 1
        },
        {
            question: "A user says they're scared to fail. What's the best response?",
            options: [
              "Failure is part of life; just get over it.",
              "That's a common fear. What's making you feel this way?",
              "You should just stop being afraid and take action.",
              "You're overthinking; there's nothing to fear."
            ],
            "correct": 2
        },
        {
            question: "A user mentions they've been feeling unmotivated lately. How should you respond?",
            options: [
              "Everyone feels lazy sometimes; it's not a big deal.",
              "That's tough. Have you thought about what might be draining your motivation?",
              "You just need to force yourself to work harder.",
              "Why not just relax and do nothing for a while?"
            ],
            "correct": 2
        },
        {
            question: "A user says they're afraid of being judged by others. How should you respond?",
            options: [
              "That's tough. Can you share more about why you feel this way?",
              "You shouldn't worry about other people; just be yourself.",
              "Judgment happens to everyone; it's normal.",
              "Why not just ignore them completely?"
            ],
            "correct": 1
        },
        {
            question: "A user expresses frustration about their lack of progress on a goal. What's the most helpful response?",
            options: [
              "That's frustrating. What's been the biggest obstacle for you?",
              "Maybe your goal is just too unrealistic.",
              "You should probably give up on it for now.",
              "Progress isn't always important; don't stress."
            ],
            "correct": 1
        },
        {
            question: "A user shares that they feel like they don't belong anywhere. What is the best response?",
            options: [
              "That must be really hard. Can you share more about how you're feeling?",
              "You're probably just imagining it; don't overthink.",
              "Everyone feels that way sometimes; it's normal.",
              "Maybe you just need to meet new people."
            ],
            "correct": 1
        },
        {
            question: "A user says they're struggling to forgive someone who hurt them. How should you respond?",
            options: [
              "You should just move on; it's not worth it.",
              "That sounds really hard. Forgiveness can take time. What's been most challenging for you?",
              "Forgiving is easy; just do it.",
              "Maybe you're holding on to it unnecessarily."
            ],
            "correct": 2
        },
        {
            question: "A user shares that they feel guilty about a past mistake. What is the best response?",
            options: [
              "Everyone makes mistakes; don't dwell on it.",
              "That's a tough feeling to deal with. Do you want to talk about it?",
              "You should stop feeling guilty; it's not worth it.",
              "Guilt is pointless; focus on the future."
            ],
            "correct": 2
        },
        {
            question: "A user says they are struggling to trust people. How should you respond?",
            options: [
              "Trust issues are common; you'll get over it.",
              "That's tough. What experiences have led you to feel this way?",
              "You should just try to trust people more.",
              "Not everyone is trustworthy; maybe you're right."
            ],
            "correct": 2
        },
        {
            question: "A user mentions they feel like they've lost their purpose. What is the best way to respond?",
            options: [
              "Everyone feels lost sometimes; it's normal.",
              "That's tough. Have you thought about what used to give you purpose?",
              "You're probably just overthinking this.",
              "Why not just try something new and see what happens?"
            ],
            "correct": 2
        }
    ];
    

    const handleAnswer = (questionIndex, optionIndex) => {
        setUserAnswers({
            ...userAnswers,
            [questionIndex]: optionIndex
        });
    };

    const handleSubmit = () => {
        setIsLoading(true);
        let finalScore = 0;
        
        Object.keys(userAnswers).forEach(questionIndex => {
            if (userAnswers[questionIndex] === questions[questionIndex].correct) {
                finalScore += 1;
            }
        });

        setScore(finalScore);
        setShowResult(true);
        setIsLoading(false);
    };
    const renderResultContent = () => {
        const percentage = ((score/questions.length) * 100).toFixed(2);
        
        if (percentage >= 70) {
            return (
                <div className="text-center space-y-4">
                    <h3 className="text-2xl text-blue-200 font-bold">
                        Congratulations! 🎉
                    </h3>
                    <p className="text-lg text-gray-700">
                        You've demonstrated excellent understanding and empathy skills. 
                        You're ready to be a CareCircle companion!
                    </p>
                </div>
            );
        }
        
        return (
            <div className="text-center space-y-4">
                <h3 className="text-xl text-amber-600 font-bold">
                    Keep Growing!
                </h3>
                <p className="text-lg text-gray-700">
                    We see your potential! Enhance your skills with our training program.
                </p>
                <a 
                    href="/training-program" 
                    className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
                >
                    Join Training Program
                </a>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            {!showResult ? (
                <>
                    <h2 className="text-3xl font-bold text-center mb-8">CareCircle Companion Assessment</h2>
                    <div className="space-y-6">
                        {questions.map((q, qIndex) => (
                            <div key={qIndex} className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold mb-4">Question {qIndex + 1}</h3>
                                <p className="text-gray-700 mb-4">{q.question}</p>
                                <div className="space-y-3">
                                    {q.options.map((option, oIndex) => (
                                        <label 
                                            key={oIndex} 
                                            className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${qIndex}`}
                                                checked={userAnswers[qIndex] === oIndex}
                                                onChange={() => handleAnswer(qIndex, oIndex)}
                                                className="form-radio h-4 w-4 text-blue-600"
                                            />
                                            <span className="text-gray-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={handleSubmit}
                            disabled={Object.keys(userAnswers).length !== questions.length || isLoading}
                            className={`w-full py-3 px-6 rounded-md text-white font-medium transition-colors
                                ${isLoading || Object.keys(userAnswers).length !== questions.length 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {isLoading ? 'Processing...' : 'Submit Test'}
                        </button>
                    </div>
                </>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6">Your Assessment Results</h2>
                    {renderResultContent()}
                </div>
            )}
        </div>
    );
};

export default CompanionText;