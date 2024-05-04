"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import React, { useState, useEffect } from "react";

const UnreadMessageCount = ({ session }) => {
  const { unread, setUnread } = useGlobalContext();

  useEffect(() => {
    if (!session) return;
    const fetchCount = async () => {
      try {
        const res = await fetch(`/api/messages/unread-count`);
        if (res.status === 200) {
          const data = await res.json();
          setUnread(data.count);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCount();
  }, [session]);
  return (
    unread > 0 && (
      <span className=" absolute left-[12px] top-[-10px] bg-red-500 text-white p-2 rounded-[100%] h-5 flex justify-center items-center">
        {unread}
      </span>
    )
  );
};

export default UnreadMessageCount;
