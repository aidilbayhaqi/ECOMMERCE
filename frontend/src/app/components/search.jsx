import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { MdSearch } from "react-icons/md";

const Search = () => {
  const pathName = usePathname()
  const useParam = useParams()
  const {replace}= useRouter()

  const handleSearch = (e)=>{
    const params = new URLSearchParams(useParam)
 const query = e.target.value;
    
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    replace(`${pathName}?${params.toString()}`);
  };

  
  return (
    <div className="flex items-center gap-3 bg-primary px-3 py-3 rounded-xl">
      <MdSearch />
      <input
        type="text"
        name=""
        placeholder='Searching...'
        id=""
        className="bg-transparent outline-none"
        onChange={handleSearch}
      />
    </div>
  );
}


export default Search