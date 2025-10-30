import React, { useState } from 'react';

const Feedback = () => {
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [thankYou, setThankYou] = useState(''); // 👈 added for thank-you message

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: feedbackMessage })
            });

            if (response.ok) {
                console.log('Feedback saved successfully');
                setFeedbackMessage(''); // 👈 clear textbox
                setThankYou('Thank you for your feedback!'); // 👈 show message
                setTimeout(() => setThankYou(''), 3000); // 👈 hide after 3 seconds
            } else {
                console.error('Error saving feedback:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving feedback:', error.message);
        }
    };

    const handleChange = (event) => {
        setFeedbackMessage(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center ">
            <form onSubmit={handleSubmit}>
                <h1 className="text-3xl text-center ">Feedback</h1>

                <div className="mb-6 mt-12 flex justify-center items-center">
                    <input
                        type="text"
                        id="default-input"
                        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={feedbackMessage}
                        onChange={handleChange}
                    />
                </div>

                <br />
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none text-center"
                >
                    Submit
                </button>
            </form>

            {thankYou && (
                <p className="text-green-600 font-semibold mt-4">{thankYou}</p>
            )}
        </div>
    );
};

export default Feedback;
