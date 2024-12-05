'use client';
import { ChangeEvent, useState } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Button, Spacer } from '@nextui-org/react';
import { IconArrowUp, IconTrash } from '@tabler/icons-react';
import { Textarea } from '@nextui-org/input';
import { useApiUrl } from '@/hooks/useApiUrl';

export default function Page() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const url = useApiUrl();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const fetchChatCompletion = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${url}/message`, {
        method: 'POST',
        body: JSON.stringify({ userMessage: input })
      });
      if (response.ok) {
        setResponse(await response.text());
      }
    } catch (error) {
      setError('Error processing request');
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen glassmorphism">
      <Card radius="none" className=" bg-transparent w-full h-full">
        <div className=" flex">
          <Button isIconOnly className="bg-transparen">
            <IconTrash color="purple" size={24} />
          </Button>
          <CardHeader className="text-center  gradient-text font-extrabold">
            Chat-Agent by Eyevinn Technology OSC
          </CardHeader>
        </div>
        <Spacer y={1} />
        <CardBody className="flex-grow text-white font-bold p-3">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {response && <p>{response}</p>}
        </CardBody>
        <div className="flex flex-grow items-center p-3 overflow-scroll">
          <Textarea
            value={input}
            onChange={handleInputChange}
            type="text"
            placeholder="Ask me anything"
            minRows={1}
            maxRows={4}
          />
          <Button
            onClick={fetchChatCompletion}
            isIconOnly
            className="bg-secondary py-1  mr-0 mb-2 ml-2 h-[30px] w-[32px] rounded-full"
          >
            <IconArrowUp color="gray" size={30} stroke={3} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
