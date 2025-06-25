import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Activity, 
  Shield, 
  Zap, 
  BarChart3, 
  ArrowRight, 
  Car, 
  Gauge, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Eye,
  Clock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  onNavigate: (page: 'home' | 'dashboard') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const tl = gsap.timeline();
      
      tl.from('.hero-title', {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
      })
      .from('.hero-subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.hero-buttons', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
      }, '-=0.6')
      .from('.hero-visual', {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        ease: 'elastic.out(1, 0.5)'
      }, '-=1');

      // Floating animation for hero visual
      gsap.to('.hero-visual', {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      });

      // Features animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 60,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Stats animation
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        duration: 1,
        scale: 0.5,
        opacity: 0,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      });

      // CTA animation
      gsap.from('.cta-content', {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      });

      // Continuous animations
      gsap.to('.pulse-ring', {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        repeat: -1
      });

      gsap.to('.rotate-slow', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1
      });

    }, [heroRef, featuresRef, statsRef, ctaRef]);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Monitor vehicle health metrics in real-time with automatic updates every 10 seconds.',
      color: 'bg-blue-500'
    },
    {
      icon: Shield,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI algorithms analyze temperature and vibration data to predict potential issues.',
      color: 'bg-green-500'
    },
    {
      icon: AlertTriangle,
      title: 'Smart Alerts',
      description: 'Get instant notifications when vehicles show warning signs or enter risk status.',
      color: 'bg-yellow-500'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboard with filtering, search, and detailed vehicle health insights.',
      color: 'bg-purple-500'
    }
  ];

  const stats = [
    { icon: Car, value: '10K+', label: 'Vehicles Monitored' },
    { icon: Clock, value: '24/7', label: 'Real-time Monitoring' },
    { icon: TrendingUp, value: '99.9%', label: 'Uptime Reliability' },
    { icon: CheckCircle, value: '95%', label: 'Issue Prevention Rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">VehicleHealth</span>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
          >
            Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="hero-title text-5xl lg:text-7xl font-bold leading-tight">
                Monitor Your
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Fleet Health
                </span>
                in Real-time
              </h1>
              
              <p className="hero-subtitle text-xl text-gray-300 leading-relaxed max-w-lg">
                Advanced AI-powered vehicle health monitoring system that predicts issues before they become problems. Keep your fleet running smoothly with real-time insights.
              </p>
              
              <div className="hero-buttons flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>View Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="px-8 py-4 border border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            <div className="hero-visual relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main dashboard mockup */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Vehicle Monitor</span>
                      </div>
                      <div className="pulse-ring w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-500/20 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold text-green-400">24</div>
                        <div className="text-xs text-gray-300">Normal</div>
                      </div>
                      <div className="bg-yellow-500/20 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold text-yellow-400">3</div>
                        <div className="text-xs text-gray-300">Warning</div>
                      </div>
                      <div className="bg-red-500/20 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold text-red-400">1</div>
                        <div className="text-xs text-gray-300">Risk</div>
                      </div>
                    </div>

                    {/* Vehicle list */}
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold">{i}</span>
                            </div>
                            <span className="text-sm">VH-00{i}</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-green-400' : i === 2 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center rotate-slow">
                  <Gauge className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="px-6 py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to keep your vehicle fleet healthy and operational
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-300">Real results from real customers</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="px-6 py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <div className="cta-content space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Fleet Management?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of fleet managers who trust our AI-powered monitoring system to keep their vehicles running at peak performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('dashboard')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Start Monitoring Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 border border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">VehicleHealth Monitor</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 VehicleHealth. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};