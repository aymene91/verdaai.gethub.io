import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, BarChart3, Zap, Leaf, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage, translations } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * Verda AI: AI-Driven Precision Agriculture
 * Design: Organic Tech Aesthetic (Simplified)
 * Color Scheme: Forest Green (#2D5016), Terracotta (#C85A3A), Lime Green (#9ACD32)
 * Typography: Playfair Display (headings) + Poppins (body)
 */

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isScrolled, setIsScrolled] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const isRTL = language === "ar";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030816121/cskiKSwKZ7a4oDETY7KpWS/verda_ai_logo_2-BgMoNJUL7vYkYVei6RxVQd.webp" 
              alt="Verda AI Logo" 
              className="h-10 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition">
              {t.features}
            </a>
            <a href="#technology" className="text-foreground hover:text-primary transition">
              {t.technology}
            </a>
            <a href="#impact" className="text-foreground hover:text-primary transition">
              {t.impact}
            </a>
            <LanguageSwitcher />
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowContactForm(true)}>
              {t.getStarted}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
              {t.exploreTitle}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
              {t.exploreSubtitle}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90"
                onClick={() => setShowContactForm(true)}
              >
                {t.explorePlatform} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setShowContactForm(true)}
              >
                {t.startFreeTrial}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider"></div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">{t.whyVerdaAI}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm hover:bg-white/20 transition">
              <Droplets className="w-12 h-12 mb-4 text-accent" />
              <h3 className="text-2xl font-bold mb-3">{t.smartWater}</h3>
              <p className="text-primary-foreground/90">
                {t.smartWaterDesc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm hover:bg-white/20 transition">
              <BarChart3 className="w-12 h-12 mb-4 text-accent" />
              <h3 className="text-2xl font-bold mb-3">{t.aiPowered}</h3>
              <p className="text-primary-foreground/90">
                {t.aiPoweredDesc}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm hover:bg-white/20 transition">
              <Zap className="w-12 h-12 mb-4 text-accent" />
              <h3 className="text-2xl font-bold mb-3">{t.automated}</h3>
              <p className="text-primary-foreground/90">
                {t.automatedDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider"></div>

      {/* Technology Section */}
      <section id="technology" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">{t.builtOnModern}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030816121/cskiKSwKZ7a4oDETY7KpWS/agriloop_iot_sensor_device_0b614427.png" 
                alt="IoT Sensor Device" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                {t.builtOnModernDesc}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t.advancedIoT}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t.machineLearning}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t.realtimeData}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t.mobileWeb}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider"></div>

      {/* Sensor Integration Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">{t.seamless}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030816121/cskiKSwKZ7a4oDETY7KpWS/agriloop_drone_watering_crops_d85d4eb6.png" 
                alt="Drone Watering Crops" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                {t.seamlessDesc}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t.soilMoisture}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t.waterFlow}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t.environmental}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{t.automated2}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider"></div>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">{t.transforming}</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">+40%</div>
              <p className="text-primary-foreground/90">{t.waterSavings}</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">+35%</div>
              <p className="text-primary-foreground/90">{t.yieldIncrease}</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <p className="text-primary-foreground/90">{t.monitoring}</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-primary-foreground/90">{t.organicReady}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider"></div>

      {/* Analytics Dashboard Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">{t.realtime}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030816121/cskiKSwKZ7a4oDETY7KpWS/agritech_iot_sensors_348183ae.png" 
                alt="Analytics Dashboard" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                {t.realtimeDesc}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t.soilTracking}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t.cropHealth}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t.diseaseAlerts}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>{t.irrigationScheduling}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider"></div>

      {/* Technology Stack Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-center">{t.poweredBy}</h2>
          <p className="text-center text-primary-foreground/90 max-w-2xl mx-auto mb-12">
            {t.poweredByDesc}
          </p>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider"></div>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">{t.ready}</h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            {t.readyDesc}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setShowContactForm(true)}
            >
              {t.startFreeTrial}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setShowContactForm(true)}
            >
              {t.scheduleDemo}
            </Button>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider"></div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">{t.product}</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#features" className="hover:text-primary-foreground transition">{t.features}</a></li>
                <li><a href="#technology" className="hover:text-primary-foreground transition">{t.technology}</a></li>
                <li><a href="#impact" className="hover:text-primary-foreground transition">{t.impact}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.company}</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition">{t.about}</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition">{t.blog}</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition">{t.contact}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.legal}</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition">{t.privacy}</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition">{t.terms}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.follow}</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition">{t.twitter}</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition">{t.linkedin}</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition">{t.github}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80">
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold">{t.getStartedModal}</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h4 className="text-xl font-bold mb-2">{t.thankYou}</h4>
                <p className="text-gray-600">{t.touchSoon}</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t.name} *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t.email} *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t.phone}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t.message}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  {t.submit}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
