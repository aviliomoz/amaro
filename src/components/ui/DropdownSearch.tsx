import { getItemTypeTag, Item } from "@amaro-software/core";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
    searchFunction: (search: string) => Promise<any[]>;
    onSelect: (item: any) => void;
}

export function DropdownSearch<T extends Item>({ searchFunction, onSelect }: Props) {
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<T[]>([]);
    const [hightlightedIndex, setHighlightedIndex] = useState<number>(0);
    const searchResultRef = useRef<HTMLUListElement>(null);

    const handleSelect = (item: T) => {
        onSelect(item);
        setSearch("");
        setSearchResult([]);
    }

    useEffect(() => {
        const handleSearch = setTimeout(() => {
            if (search.length >= 3) {
                setLoading(true);
                searchFunction(search).then(setSearchResult).finally(() => {
                    setLoading(false)
                    setHighlightedIndex(0);
                });
            } else {
                setSearchResult([]);
            }
        }, 300);

        return () => clearTimeout(handleSearch);
    }, [search])

    useEffect(() => {

        // Set up event listener for closeing the search results when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchResultRef.current && !searchResultRef.current.contains(event.target as Node)) {
                return setSearchResult([])
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        // Cleanup function to reset search and results when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowUp") {
                event.preventDefault();
                if (hightlightedIndex > 0) {
                    setHighlightedIndex(hightlightedIndex - 1);
                }
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                if (hightlightedIndex < searchResult.length - 1) {
                    setHighlightedIndex(hightlightedIndex + 1);
                }
            } else if (event.key === "Enter") {
                event.preventDefault();
                const selectedItem = searchResult[hightlightedIndex];
                if (selectedItem) {
                    handleSelect(selectedItem);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, [searchResult, hightlightedIndex]);

    return <>
        <div className="relative w-full">
            <input className="border w-full rounded-md px-3 py-1.5 focus:outline-double focus:outline-stone-200" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar producto" />
            {loading && <LoaderCircle className="size-4 stroke-stone-500 animate-spin absolute right-2 top-2" />}
        </div>
        {searchResult.length > 0 && <ul ref={searchResultRef} className="absolute top-10 left-0 w-full bg-white border border-stone-200 rounded-md shadow-lg z-10 max-h-96 overflow-y-auto">
            {searchResult.map((item, index) => (
                <li key={item.id} className={`px-3 py-2 hover:bg-stone-100 cursor-pointer flex items-center ${index === hightlightedIndex && "bg-stone-100 font-medium"}`} onClick={() => handleSelect(item)}>
                    <span className={`text-[9px] tracking-widest ${item.type === "base-recipes" ? "bg-green-300" : "bg-stone-300"} font-semibold px-1.5 rounded-md text-center mr-2`}>{getItemTypeTag(item.type)}</span> {item.name}
                </li>
            ))}
        </ul>
        }
    </>
}