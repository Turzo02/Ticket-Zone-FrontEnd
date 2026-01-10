import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const BlogUpdates = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Destinations to Visit in Bangladesh This Year",
      excerpt: "Discover the most beautiful and culturally rich destinations across Bangladesh for your next adventure.",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop",
      category: "Travel Guide",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      author: "Sarah Ahmed"
    },
    {
      id: 2,
      title: "How to Book Bus Tickets Online: Complete Guide",
      excerpt: "Step-by-step tutorial on booking bus tickets online with TicketZone for a seamless travel experience.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
      category: "Tutorial",
      date: "Dec 12, 2024",
      readTime: "3 min read",
      author: "Rahim Khan"
    },
    {
      id: 3,
      title: "Budget Travel Tips: Save Money on Your Next Journey",
      excerpt: "Smart strategies to travel more while spending less, without compromising on comfort and safety.",
      image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800&auto=format&fit=crop",
      category: "Money Saving",
      date: "Dec 10, 2024",
      readTime: "7 min read",
      author: "Nusrat Jahan"
    }
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-4">
            Latest Travel Insights
          </h2>
          <p className="text-lg  max-w-2xl mx-auto">
            Stay updated with travel tips, destination guides, and exclusive offers from our travel experts.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border" 
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 line-clamp-2 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author & Read More */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    By {post.author}
                  </span>
                  <button className="flex items-center gap-1 font-medium text-sm transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 font-medium rounded-full transition-colors duration-200 inline-flex items-center gap-2">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogUpdates;
