
import React, { useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';

interface CoffeeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 구글 앱스 스크립트 웹앱 URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx92ZY750CjhT4-l7-D048b7OXA0Slf85b8ronufRvBAgu8vlFEwiUHME7lwJHh2f5wcw/exec';

// 디스코드 웹훅 URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1460902976674598912/EbF9Gvd4WbUkUKvOXKA97at5rPWxEQauyrWG-yxgsj6Hv29RZAplqZMZSbeDtt8HMwiV';

const CoffeeChatModal: React.FC<CoffeeChatModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    terms: false,
    privacy: false,
    marketing: false
  });

  if (!isOpen) return null;

  const allRequiredChecked = 
    formData.name.trim() !== '' && 
    formData.phone.trim() !== '' && 
    formData.terms && 
    formData.privacy;

  const sendToDiscord = async (data: typeof formData) => {
    const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    
    const embed = {
      title: '☕️ 새로운 커피챗 신청이 접수되었습니다',
      color: 0xffffff, // White
      fields: [
        { name: '👤 성함', value: data.name, inline: true },
        { name: '📞 연락처', value: data.phone, inline: true },
        { name: '📅 신청 일시', value: now, inline: false },
        { 
          name: '✅ 동의 여부', 
          value: `이용약관: ${data.terms ? '동의' : '미동의'}\n개인정보: ${data.privacy ? '동의' : '미동의'}\n마케팅: ${data.marketing ? '동의' : '미동의'}`, 
          inline: false 
        }
      ],
      footer: { text: 'YNY Design Archive | Coffee Chat Alarm' }
    };

    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
      });
    } catch (error) {
      console.error('Discord notification failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequiredChecked || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 1. Google Sheets 전송 (URLSearchParams 방식)
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('phone', formData.phone);
      params.append('terms', String(formData.terms));
      params.append('privacy', String(formData.privacy));
      params.append('marketing', String(formData.marketing));

      const sheetPromise = fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });

      // 2. Discord 알림 전송
      const discordPromise = sendToDiscord(formData);

      // 두 요청을 병렬로 처리
      await Promise.allSettled([sheetPromise, discordPromise]);

      alert(`커피챗 신청이 완료되었습니다, ${formData.name}님! 확인 후 연락드리겠습니다.`);
      
      setFormData({
        name: '',
        phone: '',
        terms: false,
        privacy: false,
        marketing: false
      });
      onClose();
    } catch (error) {
      console.error('Submission failed:', error);
      alert('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAll = () => {
    const nextValue = !(formData.terms && formData.privacy && formData.marketing);
    setFormData(prev => ({
      ...prev,
      terms: nextValue,
      privacy: nextValue,
      marketing: nextValue
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
      <div className="bg-zinc-950 w-full max-w-xl rounded-2xl border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.1)] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-10 border-b border-white/5 flex justify-between items-center">
          <div>
             <h2 className="text-4xl font-black uppercase tracking-tighter">Coffee Chat</h2>
             <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Let's build a logical experience together</p>
          </div>
          <button 
            onClick={onClose} 
            disabled={isSubmitting}
            className="p-3 hover:bg-white/5 rounded-full transition-colors disabled:opacity-30"
          >
            <X size={24} className="text-zinc-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Full Name</label>
              <input 
                type="text" 
                required
                disabled={isSubmitting}
                className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 focus:border-white focus:outline-none text-xl font-bold transition-all placeholder:text-zinc-800 disabled:opacity-50"
                placeholder="성함"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Phone Number</label>
              <input 
                type="tel" 
                required
                disabled={isSubmitting}
                className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 focus:border-white focus:outline-none text-xl font-bold transition-all placeholder:text-zinc-800 disabled:opacity-50"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <button 
              type="button"
              disabled={isSubmitting}
              onClick={toggleAll}
              className="flex items-center space-x-3 w-full p-4 bg-white/5 rounded-xl transition-all hover:bg-white/10 text-left border border-white/5 disabled:opacity-50"
            >
              <div className={`w-6 h-6 rounded flex items-center justify-center transition-all ${formData.terms && formData.privacy && formData.marketing ? 'bg-white border-white' : 'border-zinc-700 border-2'}`}>
                <Check size={14} className={formData.terms && formData.privacy && formData.marketing ? 'text-black font-black' : 'text-transparent'} />
              </div>
              <span className="text-sm font-black uppercase tracking-tight">전체 동의하기</span>
            </button>

            <div className="px-2 space-y-3">
              {[
                { id: 'terms', label: '서비스 이용약관 동의 (필수)', state: formData.terms },
                { id: 'privacy', label: '개인정보 수집 및 이용 동의 (필수)', state: formData.privacy },
                { id: 'marketing', label: '마케팅 정보 수신 동의 (선택)', state: formData.marketing },
              ].map((item) => (
                <button 
                  key={item.id}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setFormData(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof prev] }))}
                  className="flex items-center space-x-4 w-full px-2 py-2 hover:bg-white/5 rounded-lg transition-colors text-left disabled:opacity-50"
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${item.state ? 'bg-white border-white' : 'border-zinc-800 border-2'}`}>
                    <Check size={10} className={item.state ? 'text-black' : 'text-transparent'} />
                  </div>
                  <span className="text-xs text-zinc-500 font-bold uppercase tracking-wide">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={!allRequiredChecked || isSubmitting}
            className={`w-full py-6 rounded-full font-black uppercase tracking-tighter text-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 ${allRequiredChecked && !isSubmitting ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-900 text-zinc-700 cursor-not-allowed'}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                전송 중...
              </>
            ) : '신청하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoffeeChatModal;
