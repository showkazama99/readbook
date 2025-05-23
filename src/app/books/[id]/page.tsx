'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Book {
  id: number;
  title: string;
  author: string;
  thumbnail: string | null;
  totalPages: number;
  currentPage: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
}

export default function BookDetail() {
  const params = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchBook();
  }, [params.id]);

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${params.id}`);
      const data = await response.json();
      setBook(data);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const updateCurrentPage = async () => {
    try {
      const response = await fetch(`/api/books/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPage }),
      });
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error('Error updating current page:', error);
    }
  };

  const addComment = async () => {
    try {
      const response = await fetch(`/api/books/${params.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await response.json();
      setBook((prev) => prev ? { ...prev, comments: [...prev.comments, data] } : null);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:w-1/3 h-96">
            {book.thumbnail ? (
              <Image
                src={book.thumbnail}
                alt={book.title}
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{book.author}</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Page
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="0"
                  max={book.totalPages}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="w-24 px-3 py-2 border rounded-md"
                />
                <button
                  onClick={updateCurrentPage}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(currentPage / book.totalPages) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {currentPage} / {book.totalPages} pages
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
              <div className="space-y-4 mb-6">
                {book.comments?.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment..."
                  className="flex-grow p-3 border rounded-md"
                  rows={3}
                />
                <button
                  onClick={addComment}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 self-end"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 