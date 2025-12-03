"use client";

import promoGif from "@/assets/images/promo.jpg";
import Modal from "@/common/Modal";
import useUserStore from "@/store/userStore";
import Image from "next/image";
import { useEffect, useState } from "react";

type PromoStorage = {
  weekStart: string;
  count: number;
};

const STORAGE_KEY = "promo-overlay-weekly";
const MAX_WEEKLY_VIEWS = 2;

const getCurrentWeekStart = () => {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day; // normalize week to start on Monday

  const weekStart = new Date(now);
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(now.getDate() + diffToMonday);

  return weekStart.toISOString();
};

const hasPersistedUser = () => {
  try {
    const storedValue = window.localStorage.getItem("user-storage");
    if (!storedValue) return false;

    const parsed = JSON.parse(storedValue);
    return Boolean(parsed?.state?.user);
  } catch (_error) {
    return false;
  }
};

const PromoOverlay = () => {
  const { user } = useUserStore();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user || hasPersistedUser()) return;

    const currentWeekStart = getCurrentWeekStart();
    let stored: PromoStorage = { weekStart: currentWeekStart, count: 0 };

    try {
      const rawValue = window.localStorage.getItem(STORAGE_KEY);
      if (rawValue) {
        stored = JSON.parse(rawValue) as PromoStorage;
      }
    } catch (_error) {
      stored = { weekStart: currentWeekStart, count: 0 };
    }

    if (stored.weekStart !== currentWeekStart) {
      stored = { weekStart: currentWeekStart, count: 0 };
    }

    if (stored.count >= MAX_WEEKLY_VIEWS) return;

    const updated = { ...stored, count: stored.count + 1 };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setOpen(true);
  }, [user]);

  useEffect(() => {
    if (user && open) setOpen(false);
  }, [open, user]);

  if (user || !open) return null;

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      className="max-w-3xl border-none bg-transparent p-0 shadow-none sm:max-w-4xl"
    >
      <div
        onClick={() => setOpen(false)}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-transparent"
      >
        <Image
          src={promoGif}
          alt="Sporty Galaxy promo"
          className="h-auto max-h-[75vh] w-full object-contain"
          priority
          unoptimized
        />
      </div>
    </Modal>
  );
};

export default PromoOverlay;
