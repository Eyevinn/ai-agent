'use client';

import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Button, Spacer } from '@nextui-org/react';
import { IconArrowUp, IconTrash } from '@tabler/icons-react';
import { TextArea } from '@/components/Textearea';

export default function Page() {
  return (
    <div className=" w-screen h-screen glassmorphism">
      <Card className="w-full h-full fixed py-2 bg-transparent  ">
        <div className=" flex">
          <Button className=" bg-transparent " isIconOnly>
            <IconTrash color="gray" size={24} />
          </Button>
          <CardHeader className="text-center fonst-bold text-white">
            Chat with AI
          </CardHeader>
        </div>
        <Spacer y={10} />
        <CardBody className="flex-grow text-white font-bold"></CardBody>
        <div className="flex bg-gray-200 flex-grow items-center p-2 overflow-scroll">
          <TextArea
            type="text"
            placeholder="Type your question..."
            minRows={1}
            maxRows={4}
          />
          <Button
            isIconOnly
            className="bg-secondary py-1  mr-0 mb-2 ml-2 h-[30px] w-[32px] rounded-full"
          >
            <IconArrowUp size={30} stroke={3} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
