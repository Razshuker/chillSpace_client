// import React, { useEffect, useState } from 'react';
// import { Configuration, OpenAIApi } from 'openai';

// export default function OpenAi() {
//     const [option, setOption] = useState({});
//     const [result, setResult] = useState('');
//     const [input, setInput] = useState('');

//     useEffect(() => {
//         chat();
//     }, []);

//     const configuration = new Configuration({
//         apiKey: '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',
//     });

//     const openai = new OpenAIApi(configuration);

//     const chat = async () => {
//         try {
//             const res = await openai.createChatCompletion({
//                 model: 'gpt-3.5-turbo',
//                 messages: [{ role: 'user', content: 'hello' }],
//             });
//             console.log(res.data.choices[0]);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const doStuff = async () => {
//         try {
//             const object = { ...option, prompt: input };
//             const response = await openai.createCompletion(object);
//             setResult(response.data.choices[0].text);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div>
//             <button onClick={chat}>Click for Chat</button>
//             <div>{result}</div>
//         </div>
//     );
// }
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL, doApiMethod } from '../services/apiService';

export default function OpenAi() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = API_URL + "/gptApi/chatgpt";
            const result = await doApiMethod(url, "POST", { prompt: input }); // Updated endpoint URL
            setResponse(result.data.text);
        } catch (error) {
            console.error(error);
            setResponse('An error occurred while processing your request.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input">Input:</label>
                <input
                    type="text"
                    id="input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <h3>Response:</h3>
                <p>{response}</p>
            </div>
        </div>
    );
}
