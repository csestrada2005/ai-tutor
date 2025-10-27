import { ChatInterface } from "@/components/ChatInterface";

const Demo = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-card border-b py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">A TETR Way to Study</h1>
          <p className="text-sm text-muted-foreground">
            By: Alan Ayala, Juan Pablo Rocha and Samuel Estrada
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Demo;
