// src/pages/ContactPage.tsx
import { useState } from 'react';
import { Search, Send, ChevronDown, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { z } from 'zod';

// Schema for form validation
const replySchema = z.object({
  message: z.string().min(5, { message: "Reply must be at least 5 characters" }),
});

// Sample data for user queries
const initialQueries = [
  {
    id: 'Q1001',
    user: {
      id: 'U124',
      name: 'John Smith',
      email: 'johnsmith@example.com',
      type: 'Donor',
      avatar: null,
    },
    subject: 'Question about medicine donation process',
    message: "I have some unused antibiotics that I'd like to donate. They expire in 2 months. Is that acceptable for donation? Also, how do I verify they're still effective?",
    date: '2025-04-10T14:23:00',
    status: 'Pending',
    priority: 'Medium',
    replies: [],
  },
  {
    id: 'Q1002',
    user: {
      id: 'U256',
      name: 'Lisa Chen',
      email: 'lisachen@example.com',
      type: 'Recipient',
      avatar: null,
    },
    subject: 'Unable to find my prescribed medication',
    message: "I've been searching for Metformin 500mg for a week but it's not showing up in the available medicines. Is there a way to get notified when it becomes available? My doctor says I need to start this medication soon.",
    date: '2025-04-11T09:45:00',
    status: 'Pending',
    priority: 'High',
    replies: [],
  },
  {
    id: 'Q1003',
    user: {
      id: 'U078',
      name: 'Valley Care Pharmacy',
      email: 'support@valleycarepharmacy.com',
      type: 'Pharmacy',
      avatar: null,
    },
    subject: 'Issue with verification system',
    message: "We're trying to verify a batch of donated medications but the system keeps timing out. We've tried multiple browsers and computers. Can someone from tech support assist us with this issue?",
    date: '2025-04-09T16:12:00',
    status: 'Pending',
    priority: 'High',
    replies: [],
  },
  {
    id: 'Q1004',
    user: {
      id: 'U342',
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      type: 'Donor',
      avatar: null,
    },
    subject: 'Haven\'t received my reimbursement',
    message: "I donated three different medications over two weeks ago, but I still haven't received my partial reimbursement. The status says 'Processing'. Could you check on this for me?",
    date: '2025-04-08T11:30:00',
    status: 'In Progress',
    priority: 'Medium',
    replies: [
      {
        id: 'R1',
        adminName: 'Admin User',
        message: "Hello Robert, I'm looking into this issue for you. Can you confirm the transaction IDs for your donations? They should be in your donation history.",
        date: '2025-04-08T14:45:00',
      }
    ],
  },
  {
    id: 'Q1005',
    user: {
      id: 'U189',
      name: 'Sarah Williams',
      email: 'sarahw@example.com',
      type: 'Recipient',
      avatar: null,
    },
    subject: 'Medicine arrived damaged',
    message: "I received my order yesterday, but the packaging was damaged and some of the blister packs were open. I'm concerned about the medication's safety. What should I do?",
    date: '2025-04-12T13:15:00',
    status: 'Pending',
    priority: 'Urgent',
    replies: [],
  },
  {
    id: 'Q1006',
    user: {
      id: 'U421',
      name: 'Michael Davis',
      email: 'mdavis@example.com',
      type: 'Donor',
      avatar: null,
    },
    subject: 'Donation tax receipt request',
    message: "I've made several donations over the past month and I need a consolidated tax receipt for all of them. Is there a way to generate this in the system, or can you provide one for me?",
    date: '2025-04-05T10:20:00',
    status: 'Resolved',
    priority: 'Low',
    replies: [
      {
        id: 'R2',
        adminName: 'Admin User',
        message: "Hi Michael, you can generate a consolidated tax receipt by going to your account dashboard, selecting 'Donation History', and clicking on 'Generate Tax Receipt'. This will allow you to select a date range and create a PDF receipt for all donations in that period.",
        date: '2025-04-05T15:30:00',
      },
      {
        id: 'R3',
        adminName: 'Michael Davis',
        message: "Thank you! I found it and was able to generate the receipt successfully.",
        date: '2025-04-06T09:10:00',
      }
    ],
  },
];

const ContactPage = () => {
  const [queries, setQueries] = useState(initialQueries);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [formError, setFormError] = useState(null);

  // Handle selecting a query to view details
  const handleSelectQuery = (query) => {
    setSelectedQuery(query);
    setReplyText('');
    setFormError(null);
  };

  // Handle sending a reply
  const handleSendReply = () => {
    try {
      // Validate the reply text
      replySchema.parse({ message: replyText });
      
      // If validation passes, add the reply
      const newReply = {
        id: `R${Date.now()}`,
        adminName: 'Admin User',
        message: replyText,
        date: new Date().toISOString(),
      };
      
      // Update the query with the new reply
      const updatedQueries = queries.map(q => {
        if (q.id === selectedQuery.id) {
          // Change status to In Progress if it was Pending
          const newStatus = q.status === 'Pending' ? 'In Progress' : q.status;
          return {
            ...q,
            replies: [...q.replies, newReply],
            status: newStatus
          };
        }
        return q;
      });
      
      setQueries(updatedQueries);
      
      // Update the selected query to show the new reply
      const updatedQuery = updatedQueries.find(q => q.id === selectedQuery.id);
      setSelectedQuery(updatedQuery);
      
      // Clear the reply text
      setReplyText('');
      setFormError(null);
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        setFormError(error.errors[0].message);
      } else {
        setFormError("An error occurred while sending your reply");
      }
    }
  };

  // Handle marking a query as resolved
  const handleMarkResolved = () => {
    const updatedQueries = queries.map(q => {
      if (q.id === selectedQuery.id) {
        return {
          ...q,
          status: 'Resolved'
        };
      }
      return q;
    });
    
    setQueries(updatedQueries);
    
    // Update the selected query
    const updatedQuery = updatedQueries.find(q => q.id === selectedQuery.id);
    setSelectedQuery(updatedQuery);
  };

  // Filter queries based on search text and filters
  const filteredQueries = queries.filter(query => {
    // Apply search filter
    const searchMatch = 
      query.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      query.message.toLowerCase().includes(searchText.toLowerCase()) ||
      query.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      query.user.email.toLowerCase().includes(searchText.toLowerCase());
    
    // Apply status filter
    const statusMatch = statusFilter === 'All' || query.status === statusFilter;
    
    // Apply priority filter
    const priorityMatch = priorityFilter === 'All' || query.priority === priorityFilter;
    
    return searchMatch && statusMatch && priorityMatch;
  });

  return (
    <div className="flex h-full">
      {/* Left sidebar - Query List */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Support Queries</h1>
          <p className="text-sm text-gray-500">Manage and respond to user queries</p>
          
          {/* Search bar */}
          <div className="mt-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Search queries..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="mt-4 flex space-x-2">
            <div className="relative w-1/2">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            
            <div className="relative w-1/2">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Query list */}
        <div className="divide-y divide-gray-200">
          {filteredQueries.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No queries found matching your criteria
            </div>
          ) : (
            filteredQueries.map((query) => (
              <div
                key={query.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedQuery?.id === query.id ? 'bg-green-50' : ''}`}
                onClick={() => handleSelectQuery(query)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {query.subject}
                    </p>
                    <p className="text-xs text-gray-500">
                      {query.user.name} ({query.user.type})
                    </p>
                  </div>
                  <div className="ml-2 flex flex-col items-end">
                    <PriorityBadge priority={query.priority} />
                    <span className="text-xs text-gray-500 mt-1">
                      {formatDate(query.date)}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                  {query.message}
                </p>
                <div className="mt-2 flex justify-between">
                  <StatusBadge status={query.status} />
                  <span className="text-xs text-gray-500">
                    {query.replies.length} {query.replies.length === 1 ? 'reply' : 'replies'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Right panel - Query Details */}
      <div className="hidden md:flex md:flex-col md:w-2/3 lg:w-3/4 bg-gray-50">
        {selectedQuery ? (
          <div className="flex flex-col h-full">
            {/* Query header */}
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedQuery.subject}</h2>
                  <div className="mt-1 flex items-center">
                    <span className="text-sm text-gray-500">
                      From: {selectedQuery.user.name} ({selectedQuery.user.email})
                    </span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">
                      {formatDate(selectedQuery.date)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <PriorityBadge priority={selectedQuery.priority} />
                  <StatusBadge status={selectedQuery.status} />
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  className="px-3 py-1 text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={handleMarkResolved}
                  disabled={selectedQuery.status === 'Resolved'}
                >
                  Mark as Resolved
                </button>
                <button
                  className="px-3 py-1 text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Flag as Spam
                </button>
                <button
                  className="px-3 py-1 text-xs font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Assign to Agent
                </button>
              </div>
            </div>
            
            {/* Conversation thread */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Original message */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        {selectedQuery.user.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {selectedQuery.user.name}
                    </div>
                    <div className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                      {selectedQuery.message}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Reply thread */}
              {selectedQuery.replies.map((reply) => (
                <div key={reply.id} className="bg-white rounded-lg shadow-sm p-4 mb-4 ml-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-medium">
                          {reply.adminName.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium text-gray-900">
                          {reply.adminName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(reply.date)}
                        </div>
                      </div>
                      <div className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                        {reply.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Reply form */}
            <div className="p-4 bg-white border-t border-gray-200">
              {selectedQuery.status !== 'Resolved' ? (
                <>
                  <div className="mb-2">
                    <textarea
                      className={`w-full border ${formError ? 'border-red-300' : 'border-gray-300'} rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                      rows={4}
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    ></textarea>
                    {formError && (
                      <p className="mt-1 text-xs text-red-600">{formError}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none">
                        Save Draft
                      </button>
                      <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none">
                        Use Template
                      </button>
                    </div>
                    <button
                      className="px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none flex items-center"
                      onClick={handleSendReply}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Send Reply
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">This query has been resolved</p>
                  <button className="mt-2 px-3 py-1 text-xs font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none">
                    Reopen Query
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageSquare className="h-12 w-12 mb-4" />
            <h3 className="text-lg font-medium">No query selected</h3>
            <p className="text-sm">Select a query from the list to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Status badge component
const StatusBadge = ({ status }:{status:string}) => {
  let colorClass = '';
  let Icon = null;
  
  switch (status) {
    case 'Pending':
      colorClass = 'bg-yellow-100 text-yellow-800';
      Icon = Clock;
      break;
    case 'In Progress':
      colorClass = 'bg-blue-100 text-blue-800';
      Icon = MessageSquare;
      break;
    case 'Resolved':
      colorClass = 'bg-green-100 text-green-800';
      Icon = CheckCircle;
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
      Icon = MessageSquare;
  }
  
  return (
    <span className={`px-2 py-1 inline-flex items-center text-xs leading-4 font-medium rounded-full ${colorClass}`}>
      <Icon className="h-3 w-3 mr-1" />
      {status}
    </span>
  );
};

// Priority badge component
const PriorityBadge = ({ priority }:{priority:string}) => {
  let colorClass = '';
  
  switch (priority) {
    case 'Urgent':
      colorClass = 'bg-red-100 text-red-800';
      break;
    case 'High':
      colorClass = 'bg-orange-100 text-orange-800';
      break;
    case 'Medium':
      colorClass = 'bg-blue-100 text-blue-800';
      break;
    case 'Low':
      colorClass = 'bg-gray-100 text-gray-800';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`px-2 py-0.5 inline-flex text-xs leading-4 font-medium rounded-full ${colorClass}`}>
      {priority}
    </span>
  );
};

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export default ContactPage;