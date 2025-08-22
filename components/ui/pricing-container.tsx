"use client"
import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { cn } from '@/lib/utils'
import { BookingDialog } from '@/components/booking-dialog'

interface PricingProps {
    title?: string;
    plans: PricingPlan[];
    className?: string;
}

interface PricingPlan {
    name: string;
    price: number;
    features: string[];
    isPopular?: boolean;
    accent: string;
    description: string;
}

// Counter Component
const Counter = ({ from, to }: { from: number; to: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    React.useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;
        const controls = animate(from, to, {
            duration: 1,
            onUpdate(value) {
                node.textContent = value.toFixed(0);
            },
        });
        return () => controls.stop();
    }, [from, to]);
    return <span ref={nodeRef} />;
};

// Header Component
const PricingHeader = ({ title }: { title: string }) => (
    <div className="text-center mb-8 sm:mb-12 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
        >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 
                bg-gradient-to-r from-white to-gray-100 px-8 py-4 rounded-xl border-4 border-black
                shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9),_15px_15px_15px_-3px_rgba(0,0,0,0.1)]
                transform transition-transform hover:translate-x-1 hover:translate-y-1 mb-3 relative
                before:absolute before:inset-0 before:bg-white/50 before:rounded-xl before:blur-sm before:-z-10">
                {title}
            </h1>
            <motion.div
                className="h-2 bg-gradient-to-r from-red-600 via-blue-600 to-green-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 }}
            />
        </motion.div>
    </div>
);


// Pricing Card Component
const PricingCard = ({
    plan,
    index,
    onBookingClick
}: {
    plan: PricingPlan;
    index: number;
    onBookingClick: (plan: PricingPlan) => void;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 15, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

    return (
        <motion.div
            ref={cardRef}
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            style={{
                rotateX,
                rotateY,
                perspective: 1000,
            }}
            onMouseMove={(e) => {
                if (!cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + rect.height / 2;
                mouseX.set((e.clientX - centerX) / rect.width);
                mouseY.set((e.clientY - centerY) / rect.height);
            }}
            onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
            }}
            className={`relative w-full bg-white rounded-xl p-6 border-3 border-black
                shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9)]
                hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)]
                transition-all duration-200`}
        >
            {/* Price Badge */}
            <motion.div
                className={cn(
                    `absolute -top-4 -right-4 w-16 h-16 
                    rounded-full flex items-center justify-center border-2 border-black
                    shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]`
                    , plan.accent)}
                animate={{
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 0.9, 1.1, 1],
                    y: [0, -5, 5, -3, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: [0.76, 0, 0.24, 1]
                }}
            >
                <div className="text-center text-white">
                    <div className="text-lg font-black">€
                        <Counter from={0} to={plan.price} />
                    </div>
                </div>
            </motion.div>

            {/* Plan Name and Popular Badge */}
            <div className="mb-4">
                <h3 className="text-xl font-black text-black mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                {plan.isPopular && (
                    <motion.span
                        className={cn(
                            `inline-block px-3 py-1 text-white
                            font-bold rounded-md text-xs border-2 border-black
                            shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]`
                            , plan.accent)}
                        animate={{
                            y: [0, -3, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}
                    >
                        PIÙ RICHIESTO
                    </motion.span>
                )}
            </div>

            {/* Features List */}
            <div className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                    <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{
                            x: 5,
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 400 }
                        }}
                        className={`flex items-center gap-2 p-2 bg-gray-50 rounded-md border-2 border-black
                            shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]`}
                    >
                        <motion.span
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            className={cn(
                                `w-5 h-5 rounded-md  flex items-center justify-center
                                text-white font-bold text-xs border border-black
                                shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)]`
                                , plan.accent)}
                        >
                            ✓
                        </motion.span>
                        <span className="text-black font-bold text-sm">{feature}</span>
                    </motion.div>
                ))}
            </div>

            {/* CTA Button */}
            <motion.button
                onClick={() => onBookingClick(plan)}
                className={cn(
                    `w-full py-3 rounded-lg text-white font-black text-sm
                    border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]
                    hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9)]
                    active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]
                    transition-all duration-200`
                    , plan.accent)}
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                }}
                whileTap={{
                    scale: 0.95,
                    rotate: [-1, 1, 0],
                }}
            >
                PRENOTA ESPERIENZA →
            </motion.button>
        </motion.div>
    );
};

// Main Container Component
export const PricingContainer = ({ title = "Pricing Plans", plans, className = "" }: PricingProps) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [selectedPackage, setSelectedPackage] = useState<PricingPlan | null>(null)

    const handleBookingClick = (plan: PricingPlan) => {
        setSelectedPackage(plan)
        setIsBookingOpen(true)
    }

    return (
        <>
            <BookingDialog 
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                selectedPackage={selectedPackage || undefined}
            />
            <div className={`min-h-screen bg-transparent p-4 sm:p-6 lg:p-8 relative overflow-hidden rounded-[12px] ${className}`}>
            <PricingHeader title={title} />

            <div className="w-[100%] max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {plans.map((plan, index) => (
                    <PricingCard
                        key={plan.name}
                        plan={plan}
                        index={index}
                        onBookingClick={handleBookingClick}
                    />
                ))}
            </div>
            </div>
        </>
    );
}; 