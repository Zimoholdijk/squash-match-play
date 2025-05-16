import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  type: 'open' | 'specific';
  inviteLink?: string;
  onFinish: () => void;
}

const SuccessScreen: React.FC<Props> = ({ type, inviteLink, onFinish }) => {
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();

  const copyInvitationLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      
      toast({
        title: "Link copied!",
        description: "The invitation link has been copied to your clipboard.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-green-600">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          {type === 'open' ? (
            <>
              <h2 className="text-xl font-semibold">Availability Submitted!</h2>
              <p className="text-gray-600">
                We'll notify you when we find a suitable match based on your availability.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">Invitation Created!</h2>
              <p className="text-gray-600">
                Share this link with your partner to schedule the game:
              </p>
              <div className="flex space-x-2">
                <Input
                  value={inviteLink}
                  readOnly
                  className="flex-1"
                />
                <Button
                  onClick={copyInvitationLink}
                  variant="outline"
                  size="icon"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </>
          )}

          <Button
            className="w-full bg-squash-primary hover:bg-squash-primary/90"
            onClick={onFinish}
          >
            Back to Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessScreen;