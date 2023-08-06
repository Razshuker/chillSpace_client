import React, { useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from "openai";

export default function OpenAi() {
    const [option, setOption] = useState({});
    const [result, setResult] = useState("");
    const [input, setInput] = useState("");


    useEffect(() => {
        chat();
    })
    const configuration = new Configuration({
        apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);

    const chat = () => {
        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "hello" }]
        }).then(res => {
            console.log(res.data.choices[0]);
        })
    }

    const doStuff = async () => {
        let object = { ...option, prompt: input };
        const response = await openai.createCompletion(object);
        setResult(response.data.choices[0].text);
    };

    return (
        <div>OpenAi</div>
    )
}
