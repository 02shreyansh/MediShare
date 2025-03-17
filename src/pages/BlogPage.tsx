import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  imageUrl: string;
  tags: string[];
}

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Benefits of Medicine Sharing: Building a Sustainable Healthcare Community",
      category: "Healthcare",
      author: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      readTime: "5 min read",
      excerpt: "Discover how medicine sharing platforms are revolutionizing healthcare accessibility while reducing medical waste...",
      imageUrl: "https://thumbs.dreamstime.com/b/hand-giving-pills-6698153.jpg",
      tags: ["Medicine Sharing", "Healthcare", "Sustainability"]
    },
    {
      id: 2,
      title: "Proper Medicine Disposal: Protecting Our Environment",
      category: "Environment",
      author: "Environmental Specialist Mike Chen",
      date: "March 12, 2024",
      readTime: "4 min read",
      excerpt: "Learn about the environmental impact of improper medicine disposal and how to safely dispose of unused medications...",
      imageUrl: "https://prdlive.kerala.gov.in/wp-content/uploads/2025/03/article2802202517_07_35-560x416.jpg",
      tags: ["Environment", "Medicine Disposal", "Safety"]
    },
    {
      id: 3,
      title: "Understanding Medicine Expiry Dates: What You Need to Know",
      category: "Education",
      author: "Pharmacist Emily Brown",
      date: "March 10, 2024",
      readTime: "6 min read",
      excerpt: "A comprehensive guide to understanding medicine expiration dates and their implications for safety and effectiveness...",
      imageUrl: "https://www.healthdigest.com/img/gallery/what-happens-if-you-take-expired-medicine/intro-1637167761.webp",
      tags: ["Education", "Medicine Safety", "Healthcare"]
    }
  ];

  const categories = ["all", "Healthcare", "Environment", "Education", "Safety"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Medishare Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Insights and updates about medicine sharing, healthcare, and proper disposal
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            type="search"
            placeholder="Search articles..."
            className="flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {post.author}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No blog posts found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
