import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  // const [showMore, setShowMore] = useState(true);
  // const [showModal, setShowModal] = useState(false);
  // const [postIdToDelete, setPostIdToDelete] = useState('');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  
  return <div>
  {currentUser.isAdmin && userPosts.length > 0 ? (
    <>
    <Table hoverable className='shadow-md'>
    <Table.Head>
    <Table.HeadCell>
    </Table.HeadCell>
    </Table.Head>
    </Table>
    </>

  ) : (
    
      <p> Uou have no posts yet!</p>
    )}
  </div>;
}
