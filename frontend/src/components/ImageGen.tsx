'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';
import { SparklesIcon } from 'lucide-react';
import Link from 'next/link';

const FormSchema = z.object({
  generatedText: z.string(),
  imagePrompt: z
    .string()
    .min(3, { message: 'Please specify the image prompt.' }),
});

export default function ImageGen({
  text,
  textGemma,
  setResImage,
}: {
  text: string;
  textGemma: string;
  setResImage: (resImage: string) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      generatedText: text || '',
      imagePrompt: '',
    },
  });

  const [imageOptions, setImageOptions] = useState<string[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');

  const promptSuggestions = [
    'Good Morning',
    'Good Night',
    'Sunset',
    'Mountains',
    'Ocean',
  ];

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/generate-image', data);
      setImageOptions(res.data.images);
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue('imagePrompt', suggestion);
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setResImage(imageUrl);
  };

  const handleTextOptionClick = (text: string) => {
    setSelectedText(text);
    setSelectedModel(text === textGemma ? 'gemma' : 'gemini');
    form.setValue('generatedText', text);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto space-y-9 w-full bg-gradient-to-r from-purple-100 via-white to-purple-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-6 rounded-lg shadow-lg"
      >
        <FormField
          control={form.control}
          name="generatedText"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 dark:text-gray-300">
                Generated Text
              </FormLabel>
              <FormControl>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-md overflow-hidden max-h-64">
                  <p className="text-gray-800 dark:text-gray-300 text-sm leading-relaxed break-words overflow-y-auto whitespace-pre-wrap max-h-56">
                    {selectedText || text}
                  </p>
                </div>
              </FormControl>
              {selectedText && (
                <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 float-right text-sm">
                  <SparklesIcon size={18} />
                  <h1>
                    Generated with{' '}
                    <Link
                      href={'https://gemini.google.com/'}
                      target="_blank"
                      className="underline underline-offset-2 text-blue-600"
                    >
                      {selectedModel === 'gemma' ? 'Gemma' : 'Gemini'}
                    </Link>
                  </h1>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imagePrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 dark:text-gray-300">
                Image Prompt
              </FormLabel>
              <FormControl>
                <Input
                  className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  placeholder="Enter Image Prompt (e.g., Good Morning, Sunset)"
                  {...field}
                />
              </FormControl>
              <div className="flex gap-2 mt-2">
                {promptSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm px-3 py-1 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-transform transform hover:scale-105 duration-300"
        >
          Generate Images
        </Button>
      </form>

      {isLoading ? (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
            Generating Images...
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-[192px] w-full bg-gray-300 dark:bg-gray-700"
              />
            ))}
          </div>
        </div>
      ) : imageOptions && imageOptions.length > 0 ? (
        <div className="mt-6 space-y-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
            Select an Image
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {imageOptions.map((imageUrl, index) => (
              <div
                key={index}
                className="cursor-pointer shadow-md hover:shadow-lg hover:scale-105 duration-200"
                onClick={() => handleImageSelect(imageUrl)}
              >
                <div className="relative w-full h-48 overflow-hidden rounded-md">
                  <Image
                    src={imageUrl}
                    alt={`Generated Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Form>
  );
}
