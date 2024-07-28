import { TextInput, Select, FileInput, Button } from 'flowbite-react';
import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  const quillRef = useRef(null);

  useEffect(() => {
    // Example of accessing the editor instance if needed
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      console.log(quill);
    }

    // Suppress the warning for development purposes only
    const originalWarn = console.warn;
    console.warn = (msg) => {
      if (msg.includes('findDOMNode is deprecated')) {
        return;
      }
      originalWarn(msg);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className=' text-center text-3xl my-7 font-semibold'>
        {' '}
        Create a post
      </h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
          />
          <Select>
            <option value='uncategorized'>Select a category</option>
            <option value='job'>Jobs</option>
            <option value='bootcamps'>Bootcamps</option>
            <option value='apprentices'>Apprentices</option>
            <option value='techevent'>TechEvents</option>
            <option value='projects'>Projects</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          ref={quillRef}
          theme='snow'
          placeholder='write something...'
          className='h-72 mb-12'
          required
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
      </form>
    </div>
  );
}
