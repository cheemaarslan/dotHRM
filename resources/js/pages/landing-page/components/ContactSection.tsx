import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Mail, Phone, MapPin, Send, User, ChevronDown, Lock, Users, HelpCircle, Plus, Clock, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/custom-toast';

interface ContactSectionProps {
  brandColor?: string;
  flash?: {
    success?: string;
    error?: string;
  };
  settings?: {
    contact_email?: string;
    contact_phone?: string;
    contact_address?: string;
  };
  sectionData?: {
    title?: string;
    subtitle?: string;
    form_title?: string;
    info_title?: string;
    info_description?: string;
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export default function ContactSection({ flash, settings, sectionData, brandColor = '#4f46e5' }: ContactSectionProps) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('landing-page.contact'), {
      onSuccess: (page) => {
        reset();
        const successMessage = page.props.flash?.success || 'Thank you for your message. We will get back to you soon!';
        toast.success(successMessage);
      },
      onError: (errors) => {
        const errorMessage = Object.values(errors).join(', ');
        toast.error(errorMessage || 'Failed to send message. Please try again.');
      }
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('Email Us'),
      content: settings?.contact_email || 'support@dothrm.com',
    },
    {
      icon: Phone,
      title: t('Call Us'),
      content: settings?.contact_phone || '+1 (555) 123-4567',
    },
    {
      icon: MapPin,
      title: t('Visit Us'),
      content: settings?.contact_address || 'Dubai Silicon Oasis, Dubai, UAE',
    }
  ].filter(info => info.content);

  const defaultFaqs = [
    t('Can I request a live demo of dotHRM?'),
    t('How quickly will I receive a response?'),
    t('Do you provide onboarding and support?')
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 min-h-screen flex flex-col justify-center bg-[#fafbfc] relative overflow-hidden">
      
      {/* Decorative Message Image & Swirl */}
      <div className="absolute top-[8%] lg:top-[8%] left-[2%] lg:left-[4%] hidden md:flex items-center opacity-90 pointer-events-none z-0">
        <img 
          src="/images/default/message.png" 
          alt="Message Decorative" 
          className="w-[180px] lg:w-[240px] h-auto object-contain drop-shadow-2xl" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8 lg:mb-10">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full mb-4 border border-indigo-100">
            <Phone className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-[11px] font-bold text-indigo-600 tracking-wide">{t('GET IN TOUCH')}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a] mb-3 tracking-tight">
            {sectionData?.title || t("We'd Love to Hear from You")}
          </h2>
          <p className="text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            {sectionData?.subtitle || t('Have questions about dotHRM? Our team is here to help you discover how smarter HR and payroll management can transform your business.')}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 relative">
          
          {/* Decorative SVG behind content if needed */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 pointer-events-none z-0 hidden lg:block">
            <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-indigo-200/40 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-200/40 blur-[100px] rounded-full"></div>
          </div>

          {/* Left Column: Form Card */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="bg-white rounded-[20px] p-5 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative z-10 flex-1 flex flex-col">
              
              {/* Form Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 border border-indigo-100/50">
                  <Mail className="w-4 h-4 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {sectionData?.form_title || t('Send Us a Message')}
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" role="form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                      {t('Full Name')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-[14px] text-gray-900 placeholder-gray-400 bg-white transition-all shadow-sm"
                        placeholder={t('Your full name')}
                        required
                        disabled={processing}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                      {t('Email Address')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-[14px] text-gray-900 placeholder-gray-400 bg-white transition-all shadow-sm"
                        placeholder={t('you@email.com')}
                        required
                        disabled={processing}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                    {t('Subject')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={data.subject}
                      onChange={(e) => setData('subject', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-[14px] text-gray-900 placeholder-gray-400 bg-white transition-all shadow-sm pr-10"
                      placeholder={t("What's this about?")}
                      required
                      disabled={processing}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.subject && <p className="text-red-500 text-xs mt-1.5">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                    {t('Message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-[14px] text-gray-900 placeholder-gray-400 bg-white resize-none transition-all shadow-sm"
                    placeholder={t('Tell us more about your inquiry...')}
                    required
                    disabled={processing}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-[#8b5cf6] rounded-xl font-bold text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity flex justify-center items-center gap-2 text-[14px] mt-2"
                >
                  {processing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> {t('Send Message')}
                    </>
                  )}
                </button>
                
                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 mt-4">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t('Your information is secure and will never be shared.')}</span>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Info & FAQs */}
          <div className="relative z-10 flex flex-col h-full gap-4">
            
            {/* Contact Information Card */}
            <div className="bg-white rounded-[20px] p-5 lg:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 border border-indigo-100/50">
                  <Users className="w-4 h-4 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {sectionData?.info_title || t('Contact Information')}
                </h3>
              </div>
              <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
                {sectionData?.info_description || t("Whether you're looking for a product demo, pricing information, technical support, or partnership opportunities, we'd love to hear from you.")}
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-900 leading-tight mb-0.5">
                        {info.title}
                      </h4>
                      <p className="text-[14px] text-gray-500">
                        {info.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Card */}
            <div className="bg-white rounded-[20px] p-5 lg:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 border border-indigo-100/50">
                  <HelpCircle className="w-4 h-4 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t('Frequently Asked Questions')}
                </h3>
              </div>
              
              <div className="space-y-1.5 mb-5">
                {(sectionData?.faqs || defaultFaqs).map((faq: any, index: number) => {
                  const questionText = typeof faq === 'string' ? faq : faq.question;
                  const answerText = typeof faq === 'string' ? t('Please contact our support team for more details about this question.') : faq.answer;
                  const isOpen = openFaq === index;

                  return (
                    <div key={index} className="border-b border-gray-100 last:border-0 rounded-lg overflow-hidden transition-colors">
                      <div 
                        className="flex items-center justify-between py-2.5 cursor-pointer hover:bg-gray-50/50 px-2 transition-colors group"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                      >
                        <span className="text-[13px] font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{questionText}</span>
                        <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-45 text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'}`}>
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out px-2 ${isOpen ? 'max-h-40 opacity-100 pb-3' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="text-[12px] text-gray-500 leading-relaxed">
                          {answerText}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Blue Box inside FAQ */}
              {/* <div className="bg-[#f8fafc] rounded-[16px] p-4 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-200">
                <div className="flex items-center gap-4 z-10">
                  <img src="/images/default/headphones.png" alt="Support" className="w-12 h-12 object-contain hidden sm:block" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      <span className="font-bold text-gray-900 text-[13px]">{t('Need immediate help?')}</span>
                    </div>
                    <p className="text-[12px] text-gray-500 leading-relaxed">
                      {t('Our support team is available 24/7 to assist you.')}
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-indigo-200 text-indigo-600 rounded-lg font-bold text-[12px] hover:bg-indigo-50 transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap z-10 flex-shrink-0">
                  {t('Chat with Support')} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div> */}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
