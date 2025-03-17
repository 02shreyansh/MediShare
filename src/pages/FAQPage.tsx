import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqData = [
    {
      category: "Medicine Sharing",
      questions: [
        {
          question: "Is it legal to share medicines through Medishare?",
          answer: "Yes, Medishare operates under strict regulatory compliance. We only allow the sharing of unopened, unexpired medications with valid prescriptions and proper verification."
        },
        {
          question: "How do you verify the authenticity of medicines?",
          answer: "We require sellers to upload original purchase bills and medicine images. Our partnership with pharmaceutical companies helps verify the authenticity of medications."
        },
        {
          question: "What types of medicines can be shared on the platform?",
          answer: "Non-controlled, prescription medications in their original packaging can be shared. Controlled substances, antibiotics, and certain other medications are prohibited."
        }
      ]
    },
    {
      category: "Buying Process",
      questions: [
        {
          question: "How is pricing determined?",
          answer: "Sellers set prices based on the original cost and remaining quantity. Our system ensures prices don't exceed market rates to prevent overcharging."
        },
        {
          question: "What payment methods are accepted?",
          answer: "We accept all major credit/debit cards, digital wallets, and bank transfers through our secure payment gateway."
        },
        {
          question: "How is delivery handled?",
          answer: "Medicines are delivered through licensed pharmaceutical partners ensuring proper handling and temperature control during transit."
        }
      ]
    },
    {
      category: "Medicine Disposal",
      questions: [
        {
          question: "How does the medicine disposal service work?",
          answer: "We partner with certified waste management facilities. Schedule a pickup, and our team will collect and properly dispose of expired medications."
        },
        {
          question: "Is there a fee for medicine disposal?",
          answer: "Basic disposal services are free. Special handling fees may apply for certain medications or large quantities."
        },
        {
          question: "What happens to disposed medicines?",
          answer: "Disposed medicines are processed following EPA guidelines to ensure environmental safety and prevent misuse."
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about medicine sharing and disposal
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Search FAQs..."
            className="max-w-md mx-auto"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category, index) => (
            <Card key={index} className="p-6">
              <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ))}
        </div>
        {filteredFAQs.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No FAQs found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
