"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!search) return;

    router.push(`/restaurant?search=${search}`);
  };

  return (
    <form
      className="flex gap-4 xl:relative xl:z-40 xl:w-[648px] xl:rounded-md xl:bg-white xl:px-6 xl:py-6"
      onSubmit={handleSearchSubmit}
    >
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button size="icon" type="submit" className="xl:bg-[#FFB100]">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
