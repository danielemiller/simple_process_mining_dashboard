import random

class OrderManagementProcess:
    def __init__(self):
        self.activities_groups = [
            ["Receive Order"],
            ["Validate Order", "Confirm Order Details"],
            ["Prepare Item", "Allocate Inventory", "Schedule Production"],
            ["Perform Quality Checks", "Organize Shipping"],
            ["Dispatch Item", "Update Order Status"],
            ["Deliver Item", "Monitor Delivery Progress"],
            ["Receive Payment", "Handle Returns", "Process Refunds"],
            ["Manage Customer Communication", "Gather Customer Feedback"],
            ["Close Order Management Process"]
        ]
        self.current_group = 0
        self.last_activity = None

    def get_next_activity(self):
        if self.current_group == 0:
            next_activity = "Receive Order"
            self.current_group = 1
            self.last_activity = next_activity
            return next_activity

        if self.current_group == len(self.activities_groups) - 1:
            next_activity = "Close Order Management Process"
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

        # Regular process flow
        next_activity = random.choice([act for act in current_activities if act != self.last_activity])
        if self.current_group < len(self.activities_groups) - 1:
            self.current_group += 1
        self.last_activity = next_activity

        return next_activity
