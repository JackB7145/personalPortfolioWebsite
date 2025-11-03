import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Twitter, Coffee, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { useIsMobile } from './ui/use-mobile';
import { getAnimationConfig } from '../lib/animations';

const personalInfo = {
  email: 'jack@jackbranston.com',
  github: 'https://github.com/jackbranston',
  linkedin: 'https://linkedin.com/in/jackbranston',
  twitter: 'https://twitter.com/jackbranston',
};

const availableTimeSlots = [
  { id: '1', date: 'Nov 5', time: '10:00 AM', available: true },
  { id: '2', date: 'Nov 5', time: '2:00 PM', available: false },
  { id: '3', date: 'Nov 6', time: '11:00 AM', available: true },
  { id: '4', date: 'Nov 6', time: '3:00 PM', available: true },
  { id: '5', date: 'Nov 7', time: '9:00 AM', available: false },
  { id: '6', date: 'Nov 7', time: '1:00 PM', available: true },
  { id: '7', date: 'Nov 8', time: '10:00 AM', available: true },
  { id: '8', date: 'Nov 8', time: '4:00 PM', available: false },
];

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
    { icon: Twitter, label: 'Twitter', href: personalInfo.twitter },
    { icon: Mail, label: 'Email', href: `mailto:${personalInfo.email}` },
  ];

  const handleBookCoffeeChat = () => {
    if (!selectedSlot || !name || !email) {
      toast.error('Please fill in all fields and select a time slot');
      return;
    }
    
    const slot = availableTimeSlots.find(s => s.id === selectedSlot);
    toast.success(`Coffee chat booked for ${slot?.date} at ${slot?.time}! Calendar invite sent to ${email}`);
    setSelectedSlot(null);
    setName('');
    setEmail('');
  };

  const handleSendMessage = () => {
    if (!name || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    toast.success('Message sent! Jack will get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
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
            Interested in collaborating or just want to chat? Book a coffee chat or send me a message.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Coffee Chat Booking */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: isMobile ? 0.3 : 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <Card className="bg-gray-900/50 border-gray-800 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-500 text-lg md:text-xl">
                  <Coffee className="w-4 h-4 md:w-5 md:h-5" />
                  Book a Coffee Chat
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs md:text-sm">
                  Schedule a 30-minute video call. Times sync with Google Calendar.
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
                  <label className="text-xs md:text-sm text-gray-400 mb-2 block">Available Time Slots</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {availableTimeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && setSelectedSlot(slot.id)}
                        disabled={!slot.available}
                        className={`p-2 md:p-3 rounded border text-xs transition-all ${
                          selectedSlot === slot.id
                            ? 'bg-red-500/20 border-red-500 text-red-400'
                            : slot.available
                            ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                            : 'bg-gray-800/50 border-gray-800 text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-1 justify-center">
                          <Calendar className="w-3 h-3" />
                          <span>{slot.date}</span>
                        </div>
                        <div className="text-xs mt-1">{slot.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleBookCoffeeChat}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-sm"
                >
                  Book Coffee Chat
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: isMobile ? 0.3 : 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            viewport={{ once: true, margin: "-50px" }}
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
                }}
                viewport={{ once: true }}
              >
                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:border-red-500/50 transition-all duration-300"
                  asChild
                >
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...(!isMobile && {
                      whileHover: { scale: 1.05 },
                      whileTap: { scale: 0.95 },
                    })}
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
