
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const CONTACT_EMAIL = 'beutchatoumi@gmail.com';
const WHATSAPP_NUMBER = '491781980607';

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(t('contact.form.error'));
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const body = new FormData();
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('subject', formData.subject);
      body.append('message', formData.message);

      const response = await fetch('/contact.php', {
        method: 'POST',
        body,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Message not sent.');
      }

      toast.success(result.message || t('contact.form.success'));
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      const emailSubject = encodeURIComponent(formData.subject);
      const emailBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
      toast.info('Votre application mail va s ouvrir. Cliquez sur Envoyer pour transmettre le message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      formData.message.trim()
        ? `Hello, my name is ${formData.name || 'a visitor'}.\nSubject: ${formData.subject || 'Project discussion'}\n\n${formData.message}`
        : 'Hello! I would like to discuss a project with you.'
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              {t('contact.form.name')}
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="bg-background text-foreground"
              required
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              {t('contact.form.email')}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-background text-foreground"
              required
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium">
            {t('contact.form.subject')}
          </Label>
          <Input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className="bg-background text-foreground"
            required
          />
          {errors.subject && (
            <p className="text-sm text-destructive">{errors.subject}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium">
            {t('contact.form.message')}
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="bg-background text-foreground resize-none"
            required
          />
          {errors.message && (
            <p className="text-sm text-destructive">{errors.message}</p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
          >
            {isSubmitting ? (
              <span>{t('contact.form.sending')}</span>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                <span>{t('contact.form.send')}</span>
              </>
            )}
          </Button>
          
          <Button
            type="button"
            onClick={handleWhatsApp}
            className="flex-1 bg-[#25D366] text-white hover:bg-[#25D366]/90 transition-all duration-200 active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>{t('contact.whatsapp')}</span>
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default ContactForm;
