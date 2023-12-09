import random

class ProcurementProcess:
    def __init__(self):
        self.activities_groups = [
            ["Create Purchase Order"],
            ["Request Quotations", "Select Supplier", "Negotiate Contract"],
            ["Approve Purchase Order", "Dispatch Order"],
            ["Monitor Order Status", "Receive Goods"],
            ["Process Invoice", "Complete Payment"],
            ["Evaluate Supplier Performance", "Finalize Purchase Details"],
            ["Conduct Market Analysis", "Renew Contract"],
            ["Close Purchase Order"]
        ]
        self.current_group = 0
        self.last_activity = None

    def get_next_activity(self):
        if self.current_group == 0:
            next_activity = "Create Purchase Order"
            self.current_group = 1
            self.last_activity = next_activity
            return next_activity

        if self.current_group == len(self.activities_groups) - 1:
            next_activity = "Close Purchase Order"
            self.current_group = 0
            self.last_activity = next_activity
            return next_activity

        current_activities = self.activities_groups[self.current_group]

        # 10% chance to go back to previous group of activities
        if self.current_group > 1 and random.random() < 0.1:
            self.current_group -= 1
            return self.get_next_activity()

        # 10% chance to repeat the last activity within the same group
        if random.random() < 0.1 and self.last_activity in current_activities:
            return self.last_activity

        # 10% chance to perform activities within the same group out of order
        # (This is inherently satisfied by the random choice from the current group)

        # Regular process flow
        next_activity = random.choice([act for act in current_activities if act != self.last_activity])
        self.current_group += 1
        self.last_activity = next_activity

        return next_activity
