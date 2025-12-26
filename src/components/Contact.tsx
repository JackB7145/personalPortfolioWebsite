'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Coffee, Calendar } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { useIsMobile } from './ui/use-mobile';
import { getAnimationConfig } from '../lib/animations';

interface ITimeSlot {
  id: string,
  date: string,
  time: string, 
  available: boolean
}

const personalInfo = {
  email: 'jbranston6@gmail.com',
  github: 'https://github.com/JackB7145',
  linkedin: 'https://linkedin.com/in/jackbranston',
  discord: 'https://discordapp.com/users/766663343502131253',
};

export function Contact() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const isMobile = useIsMobile();
  const anim = getAnimationConfig(isMobile);
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: personalInfo.github },
    { icon: Linkedin, label: 'LinkedIn', href: personalInfo.linkedin },
    { icon: FaDiscord, label: 'Discord', href: personalInfo.discord },
    { icon: Mail, label: 'Email', href: `mailto:${personalInfo.email}` },
  ];


  const handleSendMessage = async() => {
    if (!name || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })

    if (res.ok){
      toast.success('Message sent! Jack will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      toast.warning('Message Failed To Send! Try again soon')
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative bg-black">
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <motion.div
          {...anim.fadeInUp}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl mb-4 relative inline-block">
            <span className="relative text-white">
              Get in Touch
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </span>
          </h2>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-sm md:text-base px-4">
            Interested in collaborating or just want to chat? Book a coffee chat or send me a
            message.
          </p>
        </motion.div>

        {/* Booking + Contact */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Coffee Chat Booking */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: isMobile ? 0.3 : 0.6,
              ease: 'easeInOut', 
            }}
            viewport={{ once: true, margin: '-50px' }}
          >
          <Card className="bg-gray-900/50 border-gray-800 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-500 text-lg md:text-xl">
                <Coffee className="w-4 h-4 md:w-5 md:h-5" />
                Book a Coffee Chat
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs md:text-sm">
                Schedule a 15–30 minute coffee chat via Google Calendar.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-xs md:text-sm text-gray-400 leading-relaxed">
                Connect and chat casually over coffee! This is a great opportunity to:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Discuss new ideas or projects.</li>
                  <li>Share experiences and advice.</li>
                  <li>Explore collaboration opportunities.</li>
                  <li>Ask questions or get mentorship guidance.</li>
                </ul>
              </div>

              <div className="text-xs md:text-sm text-gray-400 leading-relaxed">
                Make sure to choose a time that works for you. Once booked, you'll get an email confirmation with the calendar invite.
              </div>

              <Button
                onClick={() => {
                  const googleCalendarLink =
                    'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2CjYTQUUKUuWAyfVIawec_JGaY49dmelTOJwMHS0ZSRmtoc1BHFnRsl0QsQpFjWHbVs9Fri1Mi';
                  window.open(googleCalendarLink, '_blank', 'noopener,noreferrer');
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white text-sm"
              >
                Book Coffee Chat
              </Button>

              <div className="text-gray-500 text-xs mt-2">
                Tip: Have a few topics or questions ready to make the most of your coffee chat.
              </div>
            </CardContent>
          </Card>

          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: isMobile ? 0.3 : 0.6,
              ease: 'easeInOut', // ✅ fixed typing
            }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <Card className="bg-gray-900/50 border-gray-800 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-500 text-lg md:text-xl">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  Send a Message
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs md:text-sm">
                  Prefer email? Send me a message and I'll respond within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs md:text-sm text-gray-400 mb-2 block">Your Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="bg-gray-800 border-gray-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs md:text-sm text-gray-400 mb-2 block">Your Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="bg-gray-800 border-gray-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs md:text-sm text-gray-400 mb-2 block">Message</label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project or idea..."
                    className="bg-gray-800 border-gray-700 text-white min-h-[120px] text-sm"
                  />
                </div>

                <Button
                  onClick={handleSendMessage}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-sm"
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: isMobile ? 0 : 0.2,
            duration: isMobile ? 0.3 : 0.6,
            ease: 'easeInOut', // ✅ added for consistency
          }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6 text-sm md:text-base">Or connect on social media</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, scale: isMobile ? 1 : 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: isMobile ? 0 : index * 0.1,
                  duration: isMobile ? 0.2 : 0.4,
                  ease: 'easeInOut', // ✅ type-safe
                }}
                viewport={{ once: true }}
              >
                <Button
                  variant="outline"
                  size={isMobile ? 'default' : 'lg'}
                  className="border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:border-red-500/50 transition-all duration-300"
                  asChild
                >
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={!isMobile ? { scale: 1.05 } : undefined}
                    whileTap={!isMobile ? { scale: 0.95 } : undefined}
                  >
                    <social.icon className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                    <span className="hidden md:inline">{social.label}</span>
                  </motion.a>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: isMobile ? 0 : 0.4,
            duration: isMobile ? 0.3 : 0.6,
            ease: 'easeInOut',
          }}
          viewport={{ once: true }}
          className="text-center text-gray-600 text-xs md:text-sm mt-8 md:mt-12"
        >
          <p>© 2025 Jack Branston. Built with Next.js, TailwindCSS, and Motion.</p>
        </motion.div>
      </div>
    </section>
  );
}

