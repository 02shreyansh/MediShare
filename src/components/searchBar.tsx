import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  handleSearch: () => void;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  handleSearch
}: SearchBarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-grow">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search for medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>
      <Button 
        onClick={() => setShowFilters(!showFilters)} 
        variant="outline" 
        className="md:w-auto w-full"
      >
        <Filter className="mr-2 h-4 w-4" />
        Filters
      </Button>
      <Button 
        onClick={handleSearch} 
        className="md:w-auto w-full"
      >
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </div>
  );
};

export default SearchBar;