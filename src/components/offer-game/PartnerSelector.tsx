import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  onNext: (name: string, email: string) => void;
}

const PartnerSelector: React.FC<Props> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNext = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your partner's name to continue",
        variant: "destructive"
      });
      return;
    }

    onNext(name, email);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Who would you like to play with?</h2>
            <p className="text-sm text-gray-600">
              Enter your partner's details to send them an invitation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="partner-name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="partner-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter their name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="partner-email">
                Email (optional)
              </Label>
              <Input
                id="partner-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter their email"
              />
            </div>
          </div>

          <Button
            className="w-full bg-squash-primary hover:bg-squash-primary/90"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerSelector;