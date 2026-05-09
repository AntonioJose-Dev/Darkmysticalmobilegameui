import { useState } from "react";
import { Sword, Shield, Scroll, Sparkles, Book, Gem } from "lucide-react";

export function Inventory() {
  const [activeTab, setActiveTab] = useState<"weapons" | "armor" | "scrolls">("weapons");

  const items = {
    weapons: [
      { id: 1, name: "Sword of David", icon: Sword, rarity: "legendary", power: 85, equipped: true },
      { id: 2, name: "Staff of Moses", icon: Scroll, rarity: "epic", power: 72, equipped: false },
      { id: 3, name: "Sling of Valor", icon: Sparkles, rarity: "rare", power: 58, equipped: false },
    ],
    armor: [
      { id: 4, name: "Breastplate of Righteousness", icon: Shield, rarity: "legendary", defense: 90, equipped: true },
      { id: 5, name: "Helmet of Salvation", icon: Shield, rarity: "epic", defense: 75, equipped: false },
      { id: 6, name: "Boots of Faith", icon: Shield, rarity: "rare", defense: 60, equipped: false },
    ],
    scrolls: [
      { id: 7, name: "Torah Scroll", icon: Book, rarity: "legendary", wisdom: 100, count: 3 },
      { id: 8, name: "Psalm of Protection", icon: Scroll, rarity: "epic", wisdom: 80, count: 5 },
      { id: 9, name: "Blessing Scroll", icon: Sparkles, rarity: "rare", wisdom: 65, count: 12 },
    ],
  };

  const rarityColors = {
    legendary: "from-[#d4af37] to-[#f4cf47]",
    epic: "from-[#8b5cf6] to-[#a78bfa]",
    rare: "from-[#3b82f6] to-[#60a5fa]",
  };

  const tabs = [
    { key: "weapons" as const, label: "Weapons", icon: Sword },
    { key: "armor" as const, label: "Armor", icon: Shield },
    { key: "scrolls" as const, label: "Scrolls", icon: Book },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-[#0f0f1a] to-background p-6">
      <div className="max-w-md mx-auto space-y-6 pt-6 pb-20">
        <div className="text-center">
          <h1 className="text-3xl text-[#d4af37] mb-2">אוצר</h1>
          <p className="text-[#8b7355]">Your Sacred Inventory</p>
        </div>

        <div className="bg-card border border-[#d4af37]/30 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Gem className="w-8 h-8 text-[#d4af37] mx-auto mb-1" />
              <div className="text-xl text-[#d4af37]">1,250</div>
              <div className="text-xs text-[#8b7355]">Gold</div>
            </div>
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-[#8b5cf6] mx-auto mb-1" />
              <div className="text-xl text-[#d4af37]">45</div>
              <div className="text-xs text-[#8b7355]">Gems</div>
            </div>
            <div className="text-center">
              <Book className="w-8 h-8 text-[#3b82f6] mx-auto mb-1" />
              <div className="text-xl text-[#d4af37]">20</div>
              <div className="text-xs text-[#8b7355]">Scrolls</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 bg-card border border-[#d4af37]/20 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 px-3 rounded-md transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-[#d4af37] to-[#c5a028] text-[#0a0a0f]"
                  : "text-[#8b7355] hover:text-[#d4af37]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {items[activeTab].map((item: any) => (
            <div
              key={item.id}
              className="bg-card border border-[#d4af37]/20 rounded-lg p-4 hover:border-[#d4af37]/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${rarityColors[item.rarity as keyof typeof rarityColors]} flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-8 h-8 text-[#0a0a0f]" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-[#d4af37]">{item.name}</h3>
                      <span className={`text-xs capitalize bg-gradient-to-r ${rarityColors[item.rarity as keyof typeof rarityColors]} bg-clip-text text-transparent`}>
                        {item.rarity}
                      </span>
                    </div>
                    {item.equipped && (
                      <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] px-2 py-1 rounded">
                        Equipped
                      </span>
                    )}
                    {item.count && (
                      <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] px-2 py-1 rounded">
                        x{item.count}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    {item.power && (
                      <div className="flex items-center gap-1">
                        <Sword className="w-3 h-3 text-[#8b7355]" />
                        <span className="text-[#d4af37]">{item.power}</span>
                      </div>
                    )}
                    {item.defense && (
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-[#8b7355]" />
                        <span className="text-[#d4af37]">{item.defense}</span>
                      </div>
                    )}
                    {item.wisdom && (
                      <div className="flex items-center gap-1">
                        <Book className="w-3 h-3 text-[#8b7355]" />
                        <span className="text-[#d4af37]">{item.wisdom}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!item.equipped && !item.count && (
                <button className="w-full mt-3 bg-gradient-to-r from-[#d4af37]/20 to-[#c5a028]/20 border border-[#d4af37]/40 text-[#d4af37] py-2 rounded-md hover:border-[#d4af37]/60 transition-all">
                  Equip
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
