import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  onSelect: (type: 'open' | 'specific') => void;
}

const InitialChoice: React.FC<Props> = ({ onSelect }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Who do you want to play with?</h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button 
              onClick={() => onSelect('open')} 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center p-6 space-y-3 text-center"
            >
              <div className="text-xl font-medium">Open to Anyone</div>
              <p className="text-muted-foreground">Find a match based on skill level and availability</p>
            </Button>
            
            <Button 
              onClick={() => onSelect('specific')} 
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-6 space-y-3 text-center"
            >
              <div className="text-xl font-medium">Specific Person</div>
              <p className="text-muted-foreground">Invite someone you know to play a match</p>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InitialChoice;