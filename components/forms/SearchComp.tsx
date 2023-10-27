"use client";

import { useState } from "react";
import useUsers from "@/hooks/useUsers";
import Avatar from "@/components/shared/RightSideBar/Avatar";

const SearchComp = () => {
  const { data: users, isLoading: isLoading } = useUsers();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredUsers = users.filter((user: Record<string, any>) => {
    const name = user.name.toLowerCase();
    const username = user.username.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return name.includes(searchTermLower) || username.includes(searchTermLower);
  });

  const debouncedSearch = debounce(handleSearch, 500);
  return (
    <>
      <div className="bg-gray-700 rounded-full mx-4 my-8">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent rounded-full py-2 px-4 text-white w-full focus:outline-none focus:bg-black focus:ring-2 focus:ring-blue-500"
          onChange={debouncedSearch}
        />
      </div>
      <div className="px-6 py-4">
        <div className="flex flex-col gap-6 mt-4">
          {searchTerm.length > 0
            ? filteredUsers.map((user: Record<string, any>) => (
                <div key={user.id} className="flex flex-row gap-4">
                  <div className="flex-none">
                    <Avatar userId={user.id} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-light-1 text-heading5-medium">
                      {user.name}
                    </div>
                    <div className="text-neutral-400 text-body2-medium">
                      @{user.username}
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default SearchComp;
