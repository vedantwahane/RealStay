import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const types = [
  { key: 'home', label: 'Home', emoji: '🏠' },
  { key: 'experience', label: 'Experience', emoji: '🎈' },
  { key: 'service', label: 'Service', emoji: '🛎️' },
] as const;

export default function Host() {
  const { toast } = useToast();
  const [type, setType] = useState<typeof types[number]['key']>('home');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = 'Become a host — RealStay'; }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('host_applications').insert({
        type, full_name: fullName, email, city, title, description, status: 'pending'
      });
      if (error) throw error;
      toast({ title: 'Application submitted', description: 'We will review and reach out shortly.' });
      setFullName(''); setEmail(''); setCity(''); setTitle(''); setDescription('');
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Submission saved locally', description: 'Backend table not found yet. Admin must run the migration to enable submissions.', variant: 'default' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Become a host</h1>
          <p className="text-muted-foreground mt-2">It’s easy to start hosting and earn extra income</p>
        </header>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {types.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setType(t.key)}
                  className={`rounded-xl border p-6 text-center hover-scale ${type === t.key ? 'border-primary ring-2 ring-primary/20' : 'border-muted'} `}
                  aria-pressed={type === t.key}
                >
                  <div className="text-5xl mb-3">{t.emoji}</div>
                  <div className="font-semibold">{t.label}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Type</label>
                <div className="text-muted-foreground">{types.find((t)=>t.key===type)?.label}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Full name</label>
                <Input value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Your name" required />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">City</label>
                <Input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Where is it located?" required />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Title</label>
                <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Catchy title for your listing" required />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Tell guests what makes it special" rows={5} required />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Submit'}</Button>
              </div>
            </form>
            <p className="text-xs text-muted-foreground mt-4">Note: Admin needs to enable database table for host applications. Your submission will work once migration is approved.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
